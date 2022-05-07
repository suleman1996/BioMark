import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';
import { getAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import { navigationRef } from 'services/nav-ref';
import { loggedIn } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';

const BiomarkNavigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.auth);
  const userToken = auth.userToken ? auth.userToken : null;

  async function getAuthTokenIfInAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch(loggedIn(data));
  }

  useEffect(() => {
    getAuthTokenIfInAsyncStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      {userToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default BiomarkNavigation;
