import React, { useState } from 'react';
import { Platform, StatusBar, useColorScheme } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import BiomarkNavigation from './app/navigation';
import { ErrorBoundary } from 'components';
import { store } from './app/store/store';
import AuthContext from './app/utils/auth-context';
import colors from './app/assets/colors';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <ErrorBoundary>
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
              <BiomarkNavigation />
            </SafeAreaView>
          </MenuProvider>
        </AuthContext.Provider>
        <FlashMessage floating position="top" />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
