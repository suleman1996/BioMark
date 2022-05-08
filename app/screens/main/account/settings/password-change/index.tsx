import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, ErrorText, PasswordInputWithLabel } from 'components/base';
import { TitleWithBackWhiteBgLayout } from 'components/layouts';
import { ActivityIndicator } from 'components';

import SCREENS from 'navigation/constants';
import { logNow } from 'utils/functions/log-binder';
import { heightToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalStyles } from 'utils/theme/global-styles';

import { settingsService } from 'services/account-service/settings-service';
import { navigate } from 'services/nav-ref';
import { ErrorResponse } from 'types/ErrorResponse';

import { styles } from './styles';

const PASS_TEXT = `Your new password must be at least 8 characters, include a symbol, a capital letter and a number.`;

const PasswordChangeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [eCurrent, setECurrent] = useState(true);
  const [ePass, setEPass] = useState(true);
  const [eConfirm, setEConfirm] = useState(true);
  const formikRef = useRef<any>();
  /*eslint-disable */
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      setIsInitial(false);
    }
  }, []);
  /*eslint-enable */
  const resetPassword = async ({ password }: any) => {
    logNow('password', password);
  };

  const goToPassChangedScreen = () => {
    navigate(SCREENS.NESTED_ACCOUNT_NAVIGATOR, {
      screen: SCREENS.PASSWORD_CHANGED_IN_APP,
      params: { flag: 1 },
    });
  };

  const submitForm = () => {
    logNow('formik', formikRef.current);
    // return;
    const { password, confirmPassword, currentPassword } =
      formikRef.current.values;
    setIsLoading(true);
    formikRef.current.submitForm();
    logNow(password, currentPassword);
    logNow(formikRef.current.errors);
    settingsService
      .changePassword(currentPassword, confirmPassword)
      .then((res) => {
        logNow('res', res);
        goToPassChangedScreen();

        // showMessage({
        //   message: 'Password changed successfully',
        //   type: 'success',
        // });
      })
      .catch((err: ErrorResponse) => {
        logNow(err.errMsg.data.message);
        formikRef.current.setErrors({
          currentPassword: err.errMsg.data.message,
        });
        // showMessage({
        //   message: err.errMsg.data.message,
        //   type: 'danger',
        // });
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const ResetPassSchema = Yup.object({
    currentPassword: Yup.string()
      .required('Password is required')
      .min(7, 'Too short'),
    password: Yup.string().required('Password is required').min(7, 'Too short'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
      .min(7, 'Too short'),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackWhiteBgLayout title="Update Password">
        <View style={styles.container}>
          <Text style={styles.textHeader}>
            Please enter your current password
          </Text>
          <Formik
            innerRef={formikRef}
            initialValues={{
              currentPassword: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={resetPassword}
            validationSchema={ResetPassSchema}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <>
                <ScrollView style={{ flex: 1 }}>
                  <PasswordInputWithLabel
                    marginTop={1}
                    label={'Current Password'}
                    placeholder={'Enter your current password'}
                    isSecure={eCurrent}
                    password={values.currentPassword}
                    setHidePassword={() => setECurrent(!eCurrent)}
                    hidePassword={eCurrent}
                    onChange={handleChange('currentPassword')}
                  />
                  {errors.currentPassword && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <Text
                    style={[
                      styles.textHeader,
                      {
                        marginTop: heightToDp(4),
                        letterSpacing: -0.5,
                        lineHeight: responsiveFontSize(25),
                      },
                    ]}
                  >
                    {PASS_TEXT}
                  </Text>
                  <PasswordInputWithLabel
                    marginTop={0.3}
                    label={'Enter new password'}
                    placeholder={'Enter your current password'}
                    isSecure={ePass}
                    password={values.password}
                    setHidePassword={() => setEPass(!ePass)}
                    hidePassword={ePass}
                    onChange={handleChange('password')}
                  />
                  <View style={styles.passValueContainer}>
                    <Text style={styles.passValue}>
                      {values.password.length < 15
                        ? 'Low'
                        : values.password.length < 50
                        ? 'Medium'
                        : 'High'}
                    </Text>
                    <View
                      style={[
                        styles.passValueProgress,
                        {
                          width:
                            values.password.length < 15
                              ? '0%'
                              : values.password.length < 35
                              ? '20%'
                              : values.password.length < 50
                              ? '35%'
                              : '45%',
                        },
                      ]}
                    />
                  </View>
                  {errors.password && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <PasswordInputWithLabel
                    marginTop={-1}
                    label={'Confirm New Password'}
                    placeholder={'Enter your current password'}
                    isSecure={eConfirm}
                    password={values.confirmPassword}
                    setHidePassword={() => setEConfirm(!eConfirm)}
                    hidePassword={eConfirm}
                    onChange={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <ErrorText text={errors.confirmPassword} />
                  )}
                </ScrollView>
                <View style={GlobalStyles.bottomBtnWithShadow}>
                  <Button
                    onPress={() => {
                      submitForm();
                      handleSubmit();
                    }}
                    title={'Save'}
                    disabled={
                      Object.entries(errors).length === 0
                        ? values.currentPassword
                          ? false
                          : true
                        : true
                    }
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </TitleWithBackWhiteBgLayout>
    </SafeAreaView>
  );
};

export default PasswordChangeScreen;
