import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import {styles} from './styles';
import InputWithLabel from '../../../../../components/base/input-with-label';
import ButtonComponent from '../../../../../components/base/button';
import {userService} from '../../../../../services/user-service/user-service';
import {logNow} from '../../../../../utils/functions/log-binder';
import {useDispatch, useSelector} from 'react-redux';
import {addUserContactsDetails} from '../../../../../store/auth/auth-actions';
import {IAppState} from '../../../../../store/IAppState';
import * as Yup from 'yup';
import {Formik} from 'formik';
import ErrorLineFullWidth from '../../../../../components/higher-order/error-full-width-line';

type Props = {};

const EmailChangeScreen = (props: Props) => {
  const formikRef = useRef<any>();

  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userContacts.email_address);
  const [confirmEmail, setConfirmEmail] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    userService
      .getUserContacts()
      .then(res => {
        dispatch(addUserContactsDetails(res));
      })
      .catch(err => {})
      .finally(() => {});
  }, []);

  const submitForm = () => {
    const {email, confirmEmail} = formikRef.current.values;
    logNow({email, confirmEmail});
    setIsLoading(true);
    formikRef.current.submitForm();
  };

  const ResetPassSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    confirmEmail: Yup.string()
      .email('Invalid email format')
      .required('Required')
      .oneOf([Yup.ref('email'), null], 'Email does not match')
      .required('Confirm email is required'),
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          email,
          confirmEmail: '',
        }}
        onSubmit={values => logNow(values)}
        validationSchema={ResetPassSchema}>
        {({handleChange, handleSubmit, values, errors}) => (
          <>
            <TitleWithBackWhiteBgLayout title="Email">
              <View style={styles.container}>
                <InputWithLabel
                  labelFontSize={25}
                  label={'Email Address'}
                  placeholder={'Enter your email address'}
                  value={values.email}
                  onChange={handleChange('email')}
                />
                <InputWithLabel
                  labelFontSize={25}
                  label={'Confirm Email Address'}
                  placeholder={'Enter your email address'}
                  onChange={handleChange('confirmEmail')}
                />
              </View>
            </TitleWithBackWhiteBgLayout>
            <View style={styles.bottomBtnContainer}>
              <ButtonComponent
                onPress={() => {
                  submitForm();
                  handleSubmit();
                }}
                title={'Save'}
                disabled={
                  Object.entries(errors).length === 0
                    ? values.confirmEmail
                      ? false
                      : true
                    : true
                }
              />
            </View>
            <ErrorLineFullWidth />
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EmailChangeScreen;
