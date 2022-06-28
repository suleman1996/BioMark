/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
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
import messaging from '@react-native-firebase/messaging';
import { LogBox } from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const [user, setUser] = useState('');
  const [userData, setUserData] = useState({});
  LogBox.ignoreAllLogs(true);
  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //     checkToken();
  //   }
  // }
  // const checkToken = async () => {
  //   const fcmToken = await messaging().getToken();
  //   if (fcmToken) {
  //     console.log('fcm', fcmToken);
  //   }
  // };
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
      //  setFcmToken(fcmTokenn);
      console.log('Here is the fcm token', Platform.OS, '', fcmTokenn);
      await AsyncStorage.setItem('fcm', fcmTokenn);

      // console.log(‘Authorization status:’, authStatus);
    }
  }
  //Must be outside of any component LifeCycle (such as `componentDidMount`).
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
  });
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      // console.log(‘TOKEN:’, token);
    },
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('test');

      console.log('NOTIFICATION:', notification);
      // Platform.OS === ‘android’ &&
      PushNotification.localNotification({
        channelId: 'channel-id',
        foreground: true,
        userInteraction: true,
        autoCancel: true,
        // bigText: ‘notification.data.body’,
        title: notification.data.title,
        message: notification.data.message,
        // subText: ‘notification.data.body’,
        // actions: ‘[“Yes”, “No”]’,
      });
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // console.log(‘ACTION:’, notification.action);
      // console.log(‘NOTIFICATION:’, notification);
      // process the action
    },
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === ‘ios’
     */
    requestPermissions: true,
  });

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
