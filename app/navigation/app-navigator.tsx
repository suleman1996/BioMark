import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { AccountNavigator } from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen
        name={Nav_Screens.NestedAccountNavigator}
        component={AccountNavigator}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
