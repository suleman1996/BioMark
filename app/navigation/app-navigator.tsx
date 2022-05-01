import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateProfile from 'screens/auth/create-profile';
import { getAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import { loggedIn } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import { AccountNavigator } from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';
import { Nav_Screens } from './constants';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.auth);
  const hasProfile = auth.hasProfile ? true : false;

  async function getHasprofileAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch(loggedIn(data));
    console.log('data', data);
  }

  useEffect(() => {
    getHasprofileAsyncStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Stack.Navigator
      // initialRouteName="BottomTabNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasProfile ? (
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
        <>
          <Stack.Screen name="CreateProfile" component={CreateProfile} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
