import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import InputField from '../../components/input-field/input-field';
import TextInput from '../../components/input-field/text-input';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation, useRoute} from '@react-navigation/native';
import {changePassword} from '../../services/auth-service';
import {showMessage, hideMessage} from 'react-native-flash-message';
import ActivityIndicator from '../../components/loader/activity-indicator';

export default function CreatePassword() {
  const navigations = useNavigation();
  const route = useRoute();
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [confirmPassword, setCoonfirmPassword] = React.useState('');
  const [hideConfirmPassword, setConfirmHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const ResetPassword = async ({password}) => {
    try {
      setLoading(true);
      Keyboard.dismiss();
      const result = await changePassword({
        password: {
          username: route.params.phone,
          password: password,
          code: route.params.otp,
        },
      });
      console.log('Create password success message ', result.data);
      navigations.navigate('PasswordChanged');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.errMsg);
      if (error.errMsg.status == '500') {
        showMessage({
          message: "User not exist's",
          type: 'danger',
        });
      } else if (error.errMsg.status == false) {
        showMessage({
          message: error.errMsg.data.message,
          type: 'danger',
        });
      } else {
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
      }
    }
  };

  const ResetPassSchema = Yup.object({
    password: Yup.string().required('Password is required').min(7, 'Too short'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
      .min(7, 'Too short'),
  });

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
              onSubmit={ResetPassword}
              validationSchema={ResetPassSchema}>
              {({handleChange, handleSubmit, values, errors}) => (
                <>
                  <Text style={styles.title}>
                    Please enter your new password.
                  </Text>

                  <TextInput
                    placeholder="Enter your new password..."
                    secureTextEntry={hidePassword}
                    eye={!hidePassword ? 'eye-off' : 'eye'}
                    // value={password}
                    onEyePress={() => setHidePassword(!hidePassword)}
                    // onChange={value => setPassword(value)}
                    onChange={handleChange('password')}
                    margin={0}
                  />
                  {errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}

                  <View style={{marginTop: 10}}>
                    <TextInput
                      placeholder="Retype your new password..."
                      secureTextEntry={hideConfirmPassword}
                      eye={!hideConfirmPassword ? 'eye-off' : 'eye'}
                      // value={confirmPassword}
                      onEyePress={() =>
                        setConfirmHidePassword(!hideConfirmPassword)
                      }
                      // onChange={value => setCoonfirmPassword(value)}
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
                      // onPress={() => navigations.navigate('PasswordChanged')}
                      onPress={handleSubmit}
                      title="Reset Password"
                      // disabled={
                      //   password === '' || confirmPassword === '' ? true : false
                      // }
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
