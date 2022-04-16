import {NativeBaseProvider} from 'native-base';
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
import colors from './app/assets/colors/colors';
import AppNavigator from './app/navigation/app-navigator';
import AuthNavigator from './app/navigation/autth-navigator';
import AuthContext from './app/utils/auth-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');

  return (
    <NativeBaseProvider>
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
            {user ? <AppNavigator /> : <AuthNavigator />}
          </SafeAreaView>
        </MenuProvider>
      </AuthContext.Provider>
      <FlashMessage floating position="top" />
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
