import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTheme } from 'react-native-paper';
// import { useTheme } from 'react-native-paper';
import { Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Covid19Home from 'screens/covid19';
import Covid19Bookings from 'screens/covid19/bookings';
import FaqScreen from 'screens/covid19/faq';
import BookCovidTest from 'screens/covid19/steps/book-test';
import PaymentFailed from 'screens/covid19/steps/payment-failed';
import PaymentSuccess from 'screens/covid19/steps/payment-success';
import PaymentStep from 'screens/covid19/steps/payments';
import ViewCovidResults from 'screens/covid19/view-results';
import SingleCovidResult from 'screens/covid19/view-results/single-result';
import { goBack, navigate } from 'services/nav-ref';
import { widthToDp } from 'utils/functions/responsive-dimensions';
import { responsiveFontSize } from 'utils/functions/responsive-text';
import { GlobalFonts } from 'utils/theme/fonts';
import SCREENS from './constants';
import { RFValue } from 'react-native-responsive-fontsize';

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
          headerShown: false,
          headerTintColor: colors.darkPrimary,
          title: 'COVID-19 Bookings',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                goBack();
              }}
              style={{ paddingRight: widthToDp(2) }}
            >
              <Ionicons name="arrow-back" size={responsiveFontSize(30)} />
            </Pressable>
          ),
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
          title: '',
          headerShadowVisible: false,
          headerBackButtonMenuEnabled: false,
          headerBackVisible: false,
        }}
        name={SCREENS.PAYMENT_SUCCESS}
        component={PaymentSuccess}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: colors.black,
          headerTitleStyle: { fontFamily: GlobalFonts.light },
          title: 'Back',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.BOOKCOVIDTEST,
                });
              }}
              style={{ paddingRight: widthToDp(4) }}
            >
              <Ionicons name="arrow-back" size={responsiveFontSize(30)} />
            </Pressable>
          ),
        }}
        path={'callback/'}
        name={SCREENS.PAYMENT_FAILED}
        component={PaymentFailed}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          headerTintColor: colors.darkPrimary,
          headerTitleStyle: {
            fontFamily: GlobalFonts.light,
            color: colors.darkPrimary,
            fontSize: RFValue(20),
          },
          title: 'COVID-19 Results',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                  screen: SCREENS.COVID19HOME,
                });
              }}
              style={{ paddingRight: widthToDp(2) }}
            >
              <Ionicons name="arrow-back" size={responsiveFontSize(30)} />
            </Pressable>
          ),
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

          headerLeft: () => (
            <Pressable
              onPress={() => {
                // navigate(SCREENS.NESTED_COVID19_NAVIGATOR, {
                //   screen: SCREENS.COVID19HOME,
                // });
                goBack();
              }}
              style={{ paddingRight: widthToDp(2) }}
            >
              <Ionicons name="arrow-back" size={responsiveFontSize(30)} />
            </Pressable>
          ),
        }}
        name={SCREENS.FAQSCREEN}
        component={FaqScreen}
      />
    </Stack.Navigator>
  );
};

export default Covid19Navigator;
