import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import TipProvider from 'react-native-tip';

import BiomarkNavigation from './app/navigation';
import { ErrorBoundary } from 'components';
import { store } from './app/store/store';
import AuthContext from './app/utils/auth-context';
import theme from 'utils/theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AuthContext.Provider
            value={{ user, setUser, userData, setUserData }}
          >
            <MenuProvider>
              <StatusBar
                backgroundColor={'#1B96D8'}
                barStyle={
                  Platform.OS === 'android' && isDarkMode
                    ? 'light-content'
                    : 'dark-content'
                }
              />
              <SafeAreaView
                edges={['top']}
                style={{ flex: 1, backgroundColor: '#fff' }}
              >
                <TipProvider />
                <BiomarkNavigation />
              </SafeAreaView>
            </MenuProvider>
          </AuthContext.Provider>
          <FlashMessage floating position="top" />
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
