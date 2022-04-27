import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useSelector } from 'react-redux';
import CreateProfile from 'screens/auth/create-profile';
import { IAppState } from 'store/IAppState';
import { AccountNavigator } from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';

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
