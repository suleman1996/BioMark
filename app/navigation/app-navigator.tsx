import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AccountNavigator } from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';
import CreateProfile from 'screens/auth/create_profile';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const auth = useSelector((state: IAppState) => state.auth);
  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      {auth.hasProfile ? (
        <>
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name={Nav_Screens.NestedAccountNavigator}
            component={AccountNavigator}
          />
        </>
      ) : (
        <Stack.Screen name="CreateProfile" component={CreateProfile} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
