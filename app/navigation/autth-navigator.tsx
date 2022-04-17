import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Login from '../screens/auth/login';
import Confirmation from '../screens/auth/confirmation';
import CreatePassword from '../screens/auth/create-password';
import ForgotPassword from '../screens/auth/forgot-password';
import PasswordOTP from '../screens/auth/otp-verification-password';
import PasswordChanged from '../screens/auth/password-changed';
import Signup from '../screens/auth/signup';
import SignupVerification from '../screens/auth/signup-verification';
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
