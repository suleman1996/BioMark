import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/splash/splash';
import {navigationRef} from '../services/navRef';
import ForgotPassword from '../screens/forgot-password/forgot-password';
import PasswordOTP from '../screens/otp-verification-password/otp-password';
import CreatePassword from '../screens/create-password/create-password';
import PasswordChanged from '../screens/password-changed/password-changed';
import Signup from '../screens/signup/signup'; //signup-1
import SignupVerification from '../screens/signup-verification/signup-verification';
import Confirmation from '../screens/confirmation/confirmation';
import {MainStack} from './main-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';
import Login from '../screens/auth/login';

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
