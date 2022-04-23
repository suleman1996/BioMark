import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import TitleWithBackWhiteBgLayout from '../../../../../components/layouts/back-with-title-white-bg';
import {settingsService} from '../../../../../services/account-service/settings-service';
import {logNow} from '../../../../../utils/functions/logBinder';
import {styles} from './styles';
import PasswordInputWithLabel from '../../../../../components/base/password-input-with-label';
import {heightToDp} from '../../../../../utils/functions/responsiveDimentions';
import ButtonComponent from '../../../../../components/base/button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ErrorText from '../../../../../components/base/error-text';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

type Props = {};

const PasswordChangeScreen = (props: Props) => {
  // useEffect(() => {
  //   settingsService.changePassword('00000000', '12345678').then((res) => {
  //     logNow('res');
  //   }).catch(err => {
  //     logNow(err)
  //   })
  // }, [])
  const resetPassword = ({password}: {password: string}) => {
    logNow(password);
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
    <SafeAreaView style={{flex: 1}}>
      <TitleWithBackWhiteBgLayout title="Update Password">
        <View style={styles.container}>
          <Text style={styles.textHeader}>
            Please enter your current password
          </Text>

          <Formik
            initialValues={{
              currentPassword: '',
              password: '',
              confirmPassword: '',
            }}
            onSubmit={resetPassword}
            validationSchema={ResetPassSchema}>
            {({handleChange, handleSubmit, values, errors}) => (
              <>
                <KeyboardAwareScrollView style={{flex: 1}}>
                  <PasswordInputWithLabel
                    label={'Current Password'}
                    placeholder={'Enter your current password'}
                    isSecure={false}
                    password={''}
                    setHidePassword={undefined}
                    hidePassword={false}
                    onChange={handleChange('currentPassword')}
                  />
                  {errors.currentPassword && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <Text style={[styles.textHeader, {marginTop: heightToDp(4)}]}>
                    Your new password must be at least 8 characters, include a
                    symbol, a capital letter and a number.
                  </Text>
                  <PasswordInputWithLabel
                    label={'Enter new password'}
                    placeholder={'Enter your current password'}
                    isSecure={false}
                    password={''}
                    setHidePassword={undefined}
                    hidePassword={false}
                    onChange={handleChange('password')}
                  />
                  {errors.password && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                  <PasswordInputWithLabel
                    label={'Confirm New Password'}
                    placeholder={'Enter your current password'}
                    isSecure={false}
                    password={''}
                    setHidePassword={undefined}
                    hidePassword={false}
                    onChange={handleChange('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <ErrorText text={errors.currentPassword} />
                  )}
                </KeyboardAwareScrollView>
                <View style={styles.bottomBtnContainer}>
                  <ButtonComponent
                    onPress={resetPassword}
                    title={'Save'}
                    disabled={false}
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
