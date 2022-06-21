import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';

import * as Yup from 'yup';
import { Formik } from 'formik';

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

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';

const PASS_TEXT = `Your new password must be at least 8 characters, include a symbol, a capital letter and a number.`;

const PasswordChangeScreen = () => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

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
    setIsLoading(false);
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
        setIsLoading(false);
        logNow(err.errMsg.data.message);
        if (err.errMsg.data.message === 'Invalid Access Token') {
          formikRef.current.setErrors({
            currentPassword: 'Invalid Password',
          });
        } else {
          formikRef.current.setErrors({
            currentPassword: err.errMsg.data.message,
          });
        }

        // showMessage({
        //   message: err.errMsg.data.message,
        //   type: 'danger',
        // });
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  // const ResetPassSchema = Yup.object({
  //   currentPassword: Yup.string()
  //     .required('Password is required')
  //     .min(7, 'Too short'),
  //   password: Yup.string().required('Password is required').min(7, 'Too short'),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //     .required('Confirm Password is required')
  //     .min(7, 'Too short'),
  // });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ActivityIndicator visible={isLoading} />
      <TitleWithBackWhiteBgLayout title={t('pages.password.title')}>
        <View style={styles.container}>
          <Text style={styles.textHeader}>
            {t('pages.password.description')}
          </Text>
          <Formik
            innerRef={formikRef}
            initialValues={{
              currentPassword: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={resetPassword}
            validationSchema={UpdatePassSchema}
          >
            {({ handleChange, handleSubmit, errors, values }) => (
              <>
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps>
                  <PasswordInputWithLabel
                    marginTop={1}
                    label={t('pages.password.currentPassword.title')}
                    placeholder={t(
                      'pages.password.currentPassword.placeholder'
                    )}
                    isSecure={eCurrent}
                    password={values.currentPassword}
                    setHidePassword={() => setECurrent(!eCurrent)}
                    hidePassword={eCurrent}
                    onChange={handleChange('currentPassword')}
                  />
                  {errors.currentPassword && (
                    <ErrorText
                      text={
                        values.currentPassword ? errors.currentPassword : ''
                      }
                    />
                  )}
                  <Text
                    style={[
                      styles.textHeader,
                      {
                        marginTop: heightToDp(5),
                        letterSpacing: -0.1,
                        lineHeight: responsiveFontSize(25),
                      },
                    ]}
                  >
                    {PASS_TEXT}
                  </Text>
                  <PasswordInputWithLabel
                    marginTop={0.3}
                    label={t('pages.password.newPassword.title')}
                    placeholder={t('pages.password.newPassword.placeholder')}
                    isSecure={ePass}
                    password={values.password}
                    setHidePassword={() => setEPass(!ePass)}
                    hidePassword={ePass}
                    onChange={handleChange('password')}
                  />
                  <View style={styles.passValueContainer}>
                    <Text style={styles.passValue}>
                      {values.password.length < 8
                        ? t('userProfile.passwordStrength.low')
                        : values.password.length < 10
                        ? t('userProfile.passwordStrength.medium')
                        : t('userProfile.passwordStrength.high')}
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
                    <View style={{ paddingBottom: heightToDp(3) }}>
                      <ErrorText
                        text={values.password ? errors.password : ''}
                      />
                    </View>
                  )}
                  <PasswordInputWithLabel
                    marginTop={-1}
                    label={t('pages.password.newPasswordConfirm.title')}
                    placeholder={t(
                      'pages.password.newPasswordConfirm.placeholder'
                    )}
                    isSecure={eConfirm}
                    password={values.confirmPassword}
                    setHidePassword={() => setEConfirm(!eConfirm)}
                    hidePassword={eConfirm}
                    onChange={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <ErrorText
                      text={
                        values.confirmPassword ? errors.confirmPassword : ''
                      }
                    />
                  )}
                </ScrollView>
                <View style={GlobalStyles(colors).bottomBtnWithShadow}>
                  <Button
                    onPress={() => {
                      submitForm();
                      handleSubmit();
                    }}
                    title={t('pages.password.save')}
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
const UpdatePassSchema = Yup.object({
  currentPassword: Yup.string()
    .required('Please type your new password')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
  password: Yup.string()
    .required('Please type your new password')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please type your new password')
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
});
export default PasswordChangeScreen;
