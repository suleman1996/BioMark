import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import { settingsService } from '../../../../../services/account-service/settings-service';
import { logNow } from '../../../../../utils/functions/log-binder';
import { styles } from './styles';
import PasswordInputWithLabel from '../../../../../components/base/password-input-with-label';
import { heightToDp } from '../../../../../utils/functions/responsive-dimensions';
import ButtonComponent from '../../../../../components/base/button';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../../../../components/base/error-text';
import { ErrorResponse } from '../../../../../types/ErrorResponse';
import { showMessage } from 'react-native-flash-message';
import ActivityIndicator from '../../../../../components/loader/activity-indicator';
import { goBack } from '../../../../../services/nav-ref';

type Props = {};

const PasswordChangeScreen = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [eCurrent, setECurrent] = useState(false);
  const [ePass, setEPass] = useState(false);
  const [eConfirm, setEConfirm] = useState(false);
  const formikRef = useRef<any>();

  const resetPassword = async ({ password }: any) => {
    logNow('password', password);
  };

  const submitForm = () => {
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
        showMessage({
          message: 'Password changed successfully',
          type: 'success',
        });
        goBack();
      })
      .catch((err: ErrorResponse) => {
        logNow(err.errMsg.data.message);
        showMessage({
          message: err.errMsg.data.message,
          type: 'danger',
        });
      })
      .finally(() => {
        setIsLoading(false);
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
            {({ handleChange, handleSubmit, values, errors }) => (
              <>
                <ScrollView style={{ flex: 1 }}>
                  <PasswordInputWithLabel
                    label={'Current Password'}
                    placeholder={'Enter your current password'}
                    isSecure={eCurrent}
                    password={''}
                    setHidePassword={() => setECurrent(!eCurrent)}
                    hidePassword={eCurrent}
                    onChange={handleChange('currentPassword')}
                  />
                  {errors.currentPassword && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <Text
                    style={[styles.textHeader, { marginTop: heightToDp(4) }]}
                  >
                    Your new password must be at least 8 characters, include a
                    symbol, a capital letter and a number.
                  </Text>
                  <PasswordInputWithLabel
                    label={'Enter new password'}
                    placeholder={'Enter your current password'}
                    isSecure={ePass}
                    password={''}
                    setHidePassword={() => setEPass(!ePass)}
                    hidePassword={ePass}
                    onChange={handleChange('password')}
                  />
                  {errors.password && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <PasswordInputWithLabel
                    label={'Confirm New Password'}
                    placeholder={'Enter your current password'}
                    isSecure={eConfirm}
                    password={''}
                    setHidePassword={() => setEConfirm(!eConfirm)}
                    hidePassword={eConfirm}
                    onChange={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <ErrorText text={errors.confirmPassword} />
                  )}
                </ScrollView>
                <View style={styles.bottomBtnContainer}>
                  <ButtonComponent
                    onPress={() => {
                      submitForm();
                      handleSubmit();
                    }}
                    title={'Save'}
                    disabled={
                      Object.entries(errors).length === 0 ? false : true
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
