import ButtonComponent from 'components/base/button';
import InputWithLabel from 'components/base/input-with-label';
import TitleWithBackWhiteBgLayout from 'components/layouts/back-with-title-white-bg';
import ActivityIndicator from 'components/loader/activity-indicator';
import { Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from 'services/nav-ref';
import { userService } from 'services/user-service/user-service';
import { addUserContactsDetails } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { logNow } from 'utils/functions/log-binder';
import { GlobalColors } from 'utils/theme/global-colors';
import { GlobalStyles } from 'utils/theme/global-styles';
import * as Yup from 'yup';
import { styles } from './styles';

const EmailChangeScreen = () => {
  const formikRef = useRef<any>();

  const userContacts = useSelector(
    (state: IAppState) => state.auth.userContacts
  );

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userContacts.email_address);

  /*eslint-disable */
  var isInitial = false;

  useEffect(() => {
    if (!isInitial) {
      isInitial = true;
    }
  }, []);
  /*eslint-enable */

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
    <SafeAreaView style={{ flex: 1, backgroundColor: GlobalColors.white }}>
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
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.container}>
                  <InputWithLabel
                    labelFontSize={25}
                    label={'Email Address'}
                    placeholder={'Enter your email address'}
                    value={values.email}
                    onFocus={() => formikRef.current.submitForm()}
                    onChange={handleChange('email')}
                    error={values.email ? errors.email : ''}
                  />
                  <InputWithLabel
                    labelFontSize={25}
                    onFocus={() => formikRef.current.submitForm()}
                    label={'Confirm Email Address'}
                    placeholder={'Enter your email address'}
                    onChange={handleChange('confirmEmail')}
                    value={values.confirmEmail}
                    error={values.confirmEmail ? errors.confirmEmail : ''}
                  />
                </View>
                {/* <ErrorLineFullWidth error={values.email ? errors.email : ''} />
                <ErrorLineFullWidth
                  error={values.confirmEmail ? errors.confirmEmail : ''}
                /> */}
                <View style={GlobalStyles.bottomBtnWithShadow}>
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
              </ScrollView>
            </TitleWithBackWhiteBgLayout>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default EmailChangeScreen;
