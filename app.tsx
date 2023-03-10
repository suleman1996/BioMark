/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Platform,
  StatusBar,
  useColorScheme,
  SafeAreaView,
} from 'react-native';

import * as Sentry from '@sentry/react-native';
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

Sentry.init({
  dsn: 'https://c95a60065a104840a4dd794f3afc3860@o1118311.ingest.sentry.io/6603171',

  tracesSampleRate: 1.0,
});

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
      console.log('fcm', fcmTokenn);
    }
  }

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('remoteMessage', remoteMessage);
  });
  PushNotification.configure({
    onRegister: function (token) {},

    onNotification: function (notification) {
      console.log('notification', notification);

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
      console.log('err', err.message, err);
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
      console.log('remoteMessage', remoteMessage);

      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
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
              <SafeAreaView style={{ flex: 0, backgroundColor: '#1B96D8' }} />
              <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <TipProvider />
                <BiomarkNavigation />
                <FlashMessage floating position="top" />
              </SafeAreaView>
            </MenuProvider>
          </AuthContext.Provider>
        </PaperProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default Sentry.wrap(App);
