import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Confirmation from 'screens/auth/confirmation';
import CreatePassword from 'screens/auth/create-password';
import ForgotPassword from 'screens/auth/forgot-password';
import Login from 'screens/auth/login';
import PasswordOTP from 'screens/auth/otp-verification-password';
import PasswordChanged from 'screens/auth/password-changed';
import Signup from 'screens/auth/signup';
import SignupVerification from 'screens/auth/signup-verification';
import Splash from 'screens/splash/splash';

import { Nav_Screens } from './constants';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen
      name={Nav_Screens.PasswordOTPScreen}
      component={PasswordOTP}
    />
    <Stack.Screen
      name={Nav_Screens.CreatePasswordScreen}
      component={CreatePassword}
    />
    <Stack.Screen name="PasswordChanged" component={PasswordChanged} />

    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen
      name={Nav_Screens.SignupVerificationScreen}
      component={SignupVerification}
    />
    <Stack.Screen name="Confirmation" component={Confirmation} />
  </Stack.Navigator>
);

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="authenticationStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
