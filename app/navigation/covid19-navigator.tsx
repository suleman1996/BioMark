import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
// import { useTheme } from 'react-native-paper';
import Covid19Home from 'screens/covid19';
import BookCovidTest from 'screens/covid19/steps/book-test';
import Covid19Bookings from 'screens/covid19/bookings';
import { GlobalFonts } from 'utils/theme/fonts';
import SCREENS from './constants';
import PaymentStep from 'screens/covid19/steps/payments';
import PaymentSuccess from 'screens/covid19/steps/payment-success';
import ViewCovidResults from 'screens/covid19/view-results';
import SingleCovidResult from 'screens/covid19/view-results/single-result';
import FaqScreen from 'screens/covid19/faq';

const Stack = createNativeStackNavigator();

const Covid19Navigator = () => {
  const { colors }: any = useTheme();
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
          headerShown: false,
          headerTintColor: colors.black,
          headerTitleStyle: { fontFamily: GlobalFonts.light },
          title: 'Back',
          headerShadowVisible: false,
        }}
        name={SCREENS.BOOKCOVIDTEST}
        component={BookCovidTest}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleStyle: { fontFamily: GlobalFonts.light },
          title: 'Back',
          headerShadowVisible: false,
        }}
        name={SCREENS.PAYMENT_STEP}
        component={PaymentStep}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleStyle: { fontFamily: GlobalFonts.light },
          title: 'Back',
          headerShadowVisible: false,
        }}
        name={SCREENS.PAYMENT_SUCCESS}
        component={PaymentSuccess}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.darkPrimary,
          headerTitleStyle: {
            fontFamily: GlobalFonts.light,
            color: colors.darkPrimary,
          },
          title: 'COVID-19 Results',
        }}
        name={SCREENS.VIEWCOVIDRESULTS}
        component={ViewCovidResults}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.darkPrimary,
          headerTitleStyle: {
            fontFamily: GlobalFonts.light,
            color: colors.darkPrimary,
          },
          title: 'COVID-19 Result',
        }}
        name={SCREENS.SINGLECOVIDRESULT}
        component={SingleCovidResult}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.darkPrimary,
          headerTitleStyle: {
            fontFamily: GlobalFonts.bold,
            color: colors.darkPrimary,
          },
          title: 'FAQ',
        }}
        name={SCREENS.FAQSCREEN}
        component={FaqScreen}
      />
    </Stack.Navigator>
  );
};

export default Covid19Navigator;
