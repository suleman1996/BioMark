import * as React from 'react';
import { useTheme } from 'react-native-paper';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inbox from 'screens/main/Inbox/index';
import Home from 'screens/main/home-page';
import AppointmentScreen from 'screens/main/appointment';
import AccountScreen from 'screens/main/account/account-screen';

import SCREENS from './constants';

import fonts from 'assets/fonts';
import {
  AccountIcon,
  AppointmentIcon,
  HomeIcon,
  InboxIcon,
} from 'assets/svgs/index';
import { StyleSheet, View } from 'react-native';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { useSelector } from 'react-redux';
import { IAppState } from 'store/IAppState';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const booking_count = useSelector(
    (state: IAppState) => state.notifications.allAppointmentCounts
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 11, fontFamily: fonts.mulishRegular },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: 'rgba(0, 0, 0, 0)',
        },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.inactive,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />

      <Tab.Screen
        name={SCREENS.INBOX}
        component={Inbox}
        options={{
          tabBarIcon: ({ color }) => <InboxIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.APPOINTMENT}
        component={AppointmentScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              {booking_count?.booking_result_count > 0 ||
              booking_count?.covid_booking_count > 0 ? (
                <View style={styles.redDot} />
              ) : null}
              <AppointmentIcon fill={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={SCREENS.ACCOUNT}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => <AccountIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  redDot: {
    width: widthToDp(2.4),
    height: widthToDp(2.4),
    backgroundColor: 'red',
    borderRadius: widthToDp(1.2),
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 3,
  },
});
export default BottomTabNavigator;
