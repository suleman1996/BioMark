import {extendTheme, NativeBaseProvider} from 'native-base';
import React, {useState} from 'react';
import {
  Platform,
  
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import colors from './app/assets/colors/colors';
import AppNavigator from './app/navigation/app-navigator';
import AuthNavigator from './app/navigation/autth-navigator';
import { store } from './app/store/store';
import AuthContext from './app/utils/auth-context';
import { GlobalFonts } from './app/utils/theme/fonts';
import { GlobalColors } from './app/utils/theme/globalColors';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');

  const theme = extendTheme({
    components: {
      Text: {
        baseStyle: {

        },
      },
    },
    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      extrabold: GlobalFonts.extraBold,
      bold: GlobalFonts.bold,
      semibold: GlobalFonts.semiBold,
      medium: GlobalFonts.medium,
      regular: GlobalFonts.regular,
      light: GlobalFonts.light,
      extralight: GlobalFonts.extraLight
    },
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <AuthContext.Provider value={{user, setUser}}>
          <MenuProvider>
            <StatusBar
              backgroundColor={colors.blue}
              barStyle={
                Platform.OS === 'android' && isDarkMode
                  ? 'light-content'
                  : 'dark-content'
              }
            />

            <SafeAreaView edges={['top']} style={{flex: 1}}>
              {true ? <AppNavigator /> : <AuthNavigator />}
            </SafeAreaView>
          </MenuProvider>
        </AuthContext.Provider>
        <FlashMessage floating position="top" />
      </NativeBaseProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
