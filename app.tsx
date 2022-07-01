/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import TipProvider from 'react-native-tip';

import BiomarkNavigation from './app/navigation';
import { ErrorBoundary } from 'components';
import { store } from './app/store/store';
import AuthContext from './app/utils/auth-context';
import theme from 'utils/theme';
import messaging from '@react-native-firebase/messaging';
import { LogBox } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';
  const { colors } = useTheme();

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});
  LogBox.ignoreAllLogs(true);
  useEffect(() => {
    requestUserPermission();
  }, []);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const fcmTokenn = await messaging().getToken();
      await AsyncStorage.setItem('fcm', fcmTokenn);
    }
  }
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
  PushNotification.configure({
    onRegister: function (token) {},

    onNotification: function (notification) {
      // Platform.OS === ‘android’ &&
      PushNotification.localNotification({
        channelId: 'channel-id',
        foreground: true,
        userInteraction: true,
        autoCancel: true,
        title: notification.data.title,
        message: notification.data.message,
      });

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {},
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        smallIcon: remoteMessage.notification.android.imageUrl,
      });
    });
    return unsubscribe;
  }, []);

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
                style={{ flex: 1, backgroundColor: '#1B96D8' }}
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
