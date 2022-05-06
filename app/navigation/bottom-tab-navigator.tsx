import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import colors from 'assets/colors';
import fonts from 'assets/fonts';
import {
  AccountIcon,
  AppointmentIcon,
  HomeIcon,
  InboxIcon,
} from 'assets/svgs/index';
import Inbox from 'screens/main/Inbox/index';
import Home from 'screens/main/home-page';
import AppointmentScreen from 'screens/main/appointment';
import AccountScreen from 'screens/main/account/account-screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={Home} />
  </Stack.Navigator>
);

const InboxStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={Inbox} />
  </Stack.Navigator>
);

const AppointmentStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="HomeScreen" component={AppointmentScreen} />
  </Stack.Navigator>
);

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
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={{
          tabBarIcon: ({ color }) => <InboxIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentStack}
        options={{
          tabBarIcon: ({ color }) => <AppointmentIcon fill={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => <AccountIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
