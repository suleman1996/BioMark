import * as React from 'react';
import {View, StyleSheet, processColor, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Home from '../screens/home/home-page/home';
import Inbox from '../screens/Inbox/index';
import colors from '../assets/colors/colors';

import InboxIcon from '../assets/svgs/inbox';
import AppointmentIcon from '../assets/svgs/appoinment';
import AccountIcon from '../assets/svgs/account';
import HomeIcon from '../assets/svgs/home';
import fonts from '../assets/fonts/fonts';
import {AccountNavigator} from './account-navigator'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={Home} />
  </Stack.Navigator>
);

const InboxStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={Inbox} />
  </Stack.Navigator>
);

const AppointmentStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={Inbox} />
  </Stack.Navigator>
);

const AccountStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="HomeScreen" component={Inbox} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {fontSize: 11, fontFamily: fonts.regular},
        tabBarStyle: {backgroundColor: colors.whiteColor},
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.inactive,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={{
          tabBarIcon: ({color}) => <InboxIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentStack}
        options={{
          tabBarIcon: ({color}) => <AppointmentIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({color}) => <AccountIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
