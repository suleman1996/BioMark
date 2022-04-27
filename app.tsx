import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import colors from './app/assets/colors';
import AppNavigator from './app/navigation/app-navigator';
import AuthNavigator from './app/navigation/auth-navigator';
import { getAuthAsyncStorage } from './app/services/async-storage/auth-async-storage';
import { navigationRef } from './app/services/nav-ref';
import { loggedIn } from './app/store/auth/auth-actions';
import { IAppState } from './app/store/IAppState';
import { store } from './app/store/store';

import AuthContext from './app/utils/auth-context';

const NavigationCheckIfLoggedIn = () => {
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
    <>
      <NavigationContainer ref={navigationRef}>
        {userToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser, userData, setUserData }}>
        <MenuProvider>
          <StatusBar
            backgroundColor={colors.blue}
            barStyle={
              Platform.OS === 'android' && isDarkMode
                ? 'light-content'
                : 'dark-content'
            }
          />

          <SafeAreaView edges={['top']} style={{ flex: 1 }}>
            <NavigationCheckIfLoggedIn />
          </SafeAreaView>
        </MenuProvider>
      </AuthContext.Provider>
      <FlashMessage floating position="top" />
    </Provider>
  );
};

export default App;
