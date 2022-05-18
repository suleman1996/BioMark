import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateProfile from 'screens/auth/create-profile';
import AccountNavigator from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';

import { getAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import { loggedIn } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import YourHealth from '../screens/main/home-page/your-health/index';
import SCREENS from './constants';
import Covid19Navigator from './covid19-navigator';

const Stack = createNativeStackNavigator();
const {
  NESTED_ACCOUNT_NAVIGATOR,
  CREATE_PROFILE,
  YOUR_HEALTH,
  NESTED_COVID19_NAVIGATOR,
} = SCREENS;

const AppNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.auth);
  const hasProfile = auth.hasProfile ? true : false;

  useEffect(() => {
    getHasProfileAsyncStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getHasProfileAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch(loggedIn(data));
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasProfile ? (
        <>
          <Stack.Screen
            name={SCREENS.MAIN_NAVIGATOR}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name={NESTED_ACCOUNT_NAVIGATOR}
            component={AccountNavigator}
          />
          <Stack.Screen
            name={NESTED_COVID19_NAVIGATOR}
            component={Covid19Navigator}
          />
          <Stack.Screen name={YOUR_HEALTH} component={YourHealth} />
        </>
      ) : (
        <>
          <Stack.Screen name={CREATE_PROFILE} component={CreateProfile} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
