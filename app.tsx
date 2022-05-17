import React, { useState } from 'react';
import {
  Platform,
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';
import { useTheme } from 'react-native-paper';

import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';

import BiomarkNavigation from './app/navigation';
import { ErrorBoundary } from 'components';
import { store } from './app/store/store';
import AuthContext from './app/utils/auth-context';
// import colors from './app/assets/colors';
import theme from 'utils/theme';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  const { colors } = useTheme();

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
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
