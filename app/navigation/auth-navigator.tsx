import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreatePassword from 'screens/auth/create-password';
import Confirmation from 'screens/auth/confirmation';
import ForgotPassword from 'screens/auth/forgot-password';
import Login from 'screens/auth/login';
import PasswordOTP from 'screens/auth/otp-verification-password';
import PasswordChanged from 'screens/auth/password-changed';
import Signup from 'screens/auth/signup';
import SignupVerification from 'screens/auth/signup-verification';
import Splash from 'screens/splash/splash';
import TermsAndPrivacy from 'screens/auth/terms-and-privacy';

import SCREENS from './constants';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.LOGIN} component={Login} />
      <Stack.Screen name={SCREENS.SPLASH} component={Splash} />

      <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotPassword} />
      <Stack.Screen name={SCREENS.PASSWORD_OTP} component={PasswordOTP} />
      <Stack.Screen name={SCREENS.CREATE_PASSWORD} component={CreatePassword} />
      <Stack.Screen
        name={SCREENS.PASSWORD_CHANGED}
        component={PasswordChanged}
      />
      <Stack.Screen name={SCREENS.SIGNUP} component={Signup} />
      <Stack.Screen
        name={SCREENS.SIGNUP_VERIFICATION}
        component={SignupVerification}
      />
      <Stack.Screen name={SCREENS.CONFIRMATION} component={Confirmation} />
      <Stack.Screen
        name={SCREENS.TERMS_AND_PRIVACY}
        component={TermsAndPrivacy}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
