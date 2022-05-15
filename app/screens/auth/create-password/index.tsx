import { Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRoute } from '@react-navigation/native';

import { Header, TextInput, ActivityIndicator } from 'components';
import { Button } from 'components/button';

import { navigate } from 'services/nav-ref';
import SCREENS from 'navigation/constants';

import styles from './styles';

export default function CreatePassword() {
  const route = useRoute();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setConfirmHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetPassword = async ({ password }) => {
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
        <Header title="Reset Password" />
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
              {({ handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                  <Text style={styles.title}>
                    Please enter your new password.
                  </Text>

                  <Text style={styles.inputLablel}>New Password</Text>
                  <TextInput
                    placeholder="Enter your new password..."
                    secureTextEntry={hidePassword}
                    eye={!hidePassword ? 'eye' : 'eye-off'}
                    onEyePress={() => setHidePassword(!hidePassword)}
                    onChange={handleChange('password')}
                    margin={0}
                  />
                  {errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}

                  <Text style={[styles.inputLablel, { marginTop: 30 }]}>
                    Confirm New Password
                  </Text>
                  <View>
                    <TextInput
                      placeholder="Retype your new password..."
                      secureTextEntry={hideConfirmPassword}
                      eye={!hideConfirmPassword ? 'eye' : 'eye-off'}
                      onEyePress={() =>
                        setConfirmHidePassword(!hideConfirmPassword)
                      }
                      onChange={handleChange('confirmPassword')}
                      margin={0}
                    />
                    {errors.confirmPassword && (
                      <Text style={styles.errorMessage}>
                        {errors.confirmPassword}
                      </Text>
                    )}
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
    .required('Password is required')
    .min(8, 'Must be 8 characters long.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'At least have a Capital letter, a digit and a special character.'
    ),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
    .min(7, 'Too short')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Atleast have one digit, one captial letter and one special character.'
    ),
});
