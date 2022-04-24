import { View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { showMessage } from 'react-native-flash-message';

import ActivityIndicator from 'components/loader/activity-indicator';
import { goBack } from 'services/nav-ref';
import TitleWithBackWhiteBgLayout from 'components/layouts/back-with-title-white-bg';
import { styles } from './styles';
import InputWithLabel from 'components/base/input-with-label';
import ButtonComponent from 'components/base/button';
import { userService } from 'services/user-service/user-service';
import { logNow } from 'utils/functions/log-binder';
import { useDispatch, useSelector } from 'react-redux';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import ErrorLineFullWidth from 'components/higher-order/error-full-width-line';

const EmailChangeScreen = () => {
  const formikRef = useRef<any>();

  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userContacts.email_address);

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(userContacts.email_address);
  }, [userContacts.email_address]);

  useEffect(() => {
    userService
      .getUserContacts()
      .then((res) => {
        dispatch(addUserContactsDetails(res));
      })
      .catch(() => {})
      .finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = () => {
    const { confirmEmail } = formikRef.current.values;
    logNow({ email, confirmEmail });
    setIsLoading(true);
    formikRef.current.submitForm();
    userService
      .saveUserContacts(confirmEmail)
      .then(() => {
        showMessage({
          message: 'Email changed successfully',
          type: 'success',
        });
        goBack();
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
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
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isLoading} />
      <Formik
        innerRef={formikRef}
        initialValues={{
          email,
          confirmEmail: '',
        }}
        onSubmit={(values) => logNow(values)}
        validationSchema={ResetPassSchema}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
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
                  value={''}
                />
              </View>
            </TitleWithBackWhiteBgLayout>
            <ErrorLineFullWidth error={errors.email || errors.confirmEmail} />
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
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EmailChangeScreen;
