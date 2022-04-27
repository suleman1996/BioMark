import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountNavigator } from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';
import CreateProfile from 'screens/auth/create_profile';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  var hasProfile = 'false';

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    // get Data from Storage
    try {
      const data = await AsyncStorage.getItem('hasProfile');
      if (data !== null) {
        hasProfile = data;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Stack.Navigator
      initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasProfile === 'true' ? (
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
