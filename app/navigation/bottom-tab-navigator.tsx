import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Inbox from 'screens/main/Inbox/index';
import Home from 'screens/main/home-page';
import AppointmentScreen from 'screens/main/appointment';
import AccountScreen from 'screens/main/account/account-screen';

import SCREENS from './constants';

import colors from 'assets/colors';
import fonts from 'assets/fonts';
import {
  AccountIcon,
  AppointmentIcon,
  HomeIcon,
  InboxIcon,
} from 'assets/svgs/index';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 11, fontFamily: fonts.regular },
        tabBarStyle: {
          backgroundColor: colors.whiteColor,
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
          tabBarIcon: ({ color }) => <AppointmentIcon fill={color} />,
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

export default BottomTabNavigator;
