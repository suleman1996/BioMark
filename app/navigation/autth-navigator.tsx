import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Login from '../screens/auth/login';
import Confirmation from '../screens/confirmation/confirmation';
import CreatePassword from '../screens/create-password/create-password';
import ForgotPassword from '../screens/forgot-password/forgot-password';
import PasswordOTP from '../screens/otp-verification-password/otp-password';
import PasswordChanged from '../screens/password-changed/password-changed';
import SignupVerification from '../screens/signup-verification/signup-verification';
import Signup from '../screens/signup/signup'; //signup-1
import Splash from '../screens/splash/splash';
import { navigationRef } from '../services/navRef';

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="PasswordOTP" component={PasswordOTP} />
    <Stack.Screen name="CreatePassword" component={CreatePassword} />
    <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="SignupVerification" component={SignupVerification} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
  </Stack.Navigator>
);

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="authenticationStack"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="AuthenticationStack"
        component={AuthenticationStack}
      />
      {/* <Stack.Screen
        name={Nav_Screens.Main_Navigator}
        component={BottomTabNavigator}
      /> */}
    </Stack.Navigator>
  );
};

export default function AuthNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
