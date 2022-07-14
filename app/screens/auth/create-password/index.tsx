import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRoute } from '@react-navigation/native';

import { Header, TextInput, ActivityIndicator } from 'components';
import { Button } from 'components/button';
import { useTheme } from 'react-native-paper';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import makeStyles from './styles';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { BioDangerWhite } from 'components/svg';

export default function CreatePassword() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const route = useRoute();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setConfirmHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ password }) => {
    console.log('password', password);

    setLoading(true);

    navigate(SCREENS.PASSWORD_OTP, {
      password: password,
      phone: route?.params?.phone,
    });
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Header title={t('pages.resetPassword.title')} />
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.body}>
            <Formik
              initialValues={{
                password: '',
                confirmPassword: '',
              }}
              onSubmit={resetPassword}
              validationSchema={ResetPassSchema}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                touched,
              }) => (
                <>
                  <Text style={styles.title}>
                    {t('pages.resetPassword.resetDescription')}
                  </Text>

                  <Text style={styles.inputLablel}>
                    {t('pages.password.newPassword.title')}
                  </Text>
                  <TextInput
                    placeholder={t(
                      'pages.password.currentPassword.placeholder'
                    )}
                    containerStyle={{ borderRadius: 8 }}
                    secureTextEntry={hidePassword}
                    eye={!hidePassword ? 'eye' : 'eye-off'}
                    onEyePress={() => setHidePassword(!hidePassword)}
                    onChange={handleChange('password')}
                    //  margin={20}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password ? (
                    <View style={styles.errorContainer}>
                      <BioDangerWhite width={3.5} height={3.5} />
                      <Text style={styles.errorText}>{errors.password}</Text>
                    </View>
                  ) : null}

                  <Text style={[styles.inputLablel, { marginTop: 30 }]}>
                    {t('pages.password.newPasswordConfirm.title')}
                  </Text>
                  <View>
                    <TextInput
                      placeholder={t(
                        'pages.password.currentPassword.placeholder'
                      )}
                      containerStyle={{ borderRadius: 8 }}
                      secureTextEntry={hideConfirmPassword}
                      eye={!hideConfirmPassword ? 'eye' : 'eye-off'}
                      onEyePress={() =>
                        setConfirmHidePassword(!hideConfirmPassword)
                      }
                      onChange={handleChange('confirmPassword')}
                      //  margin={20}
                      onBlur={() => setFieldTouched('confirmPassword')}
                    />
                    {touched.confirmPassword && errors.confirmPassword ? (
                      <View style={styles.errorContainer}>
                        <BioDangerWhite width={3.5} height={3.5} />
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.floatingBtn}>
                    <Button
                      onPress={handleSubmit}
                      title="Reset Password"
                      disabled={
                        !isValid || values.password == '' ? true : false
                      }
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

const ResetPassSchema = Yup.object({
  password: Yup.string()
    .required(i18next.t('pages.password.newPassword.errors.required'))
    .min(8, 'Must be 8 characters long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'At least have a Capital letter, a digit and a special character.'
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'New Password does not match.')

    .required(i18next.t('pages.password.newPasswordConfirm.errors.required'))
    .min(7, 'Too short')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
});
