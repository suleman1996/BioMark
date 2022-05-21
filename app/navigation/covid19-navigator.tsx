import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
// import { useTheme } from 'react-native-paper';
import Covid19Home from 'screens/covid19';
import BookCovidTest from 'screens/covid19/book-test';
import Covid19Bookings from 'screens/covid19/bookings';
import { GlobalFonts } from 'utils/theme/fonts';
import SCREENS from './constants';

const Stack = createNativeStackNavigator();

const Covid19Navigator = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.COVID19HOME}
        component={Covid19Home}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.darkPrimary,
          title: 'COVID-19 Bookings',
        }}
        name={SCREENS.COVID19BOOKINGS}
        component={Covid19Bookings}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleStyle: { fontFamily: GlobalFonts.light },
          title: 'Back',
          headerShadowVisible: false,
        }}
        name={SCREENS.BOOKCOVIDTEST}
        component={BookCovidTest}
      />
    </Stack.Navigator>
  );
};

export default Covid19Navigator;
