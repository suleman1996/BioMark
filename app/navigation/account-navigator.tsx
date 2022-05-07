import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GlobalColors } from 'utils/theme/global-colors';
import DependantsScreen from 'screens/main/account/dependants';
import AddDependantScreen from 'screens/main/account/dependants/add-dependant';
import EditDependantScreen from 'screens/main/account/dependants/edit-dependant';
import SettingsScreen from 'screens/main/account/settings';
import PasswordChangeScreen from 'screens/main/account/settings/password-change';
import EmailChangeScreen from 'screens/main/account/settings/email-change';
import PhoneChangeScreen from 'screens/main/account/settings/phone-change';
import MarketingConsentScreen from 'screens/main/account/settings/marketing-consent';
import TermsAndPrivacy from 'screens/auth/terms-and-privacy';
import PasswordChanged from 'screens/auth/password-changed';
import EditProfileScreen from 'screens/main/account/profile/edit-profile';
import PersonalInformationScreen from 'screens/main/account/profile/personal-information';
import BodyMeasurementScreen from 'screens/main/account/profile/body-measurements';
import MedicalHistoryScreen from 'screens/main/account/profile/medical-history';
import FamilyMedicalHistory from 'screens/main/account/profile/family-medical-history';
import SmokingScreen from 'screens/main/account/profile/edit-profile/smoking';
import ExerciseScreen from 'screens/main/account/profile/edit-profile/exercise';
import Stress from 'screens/main/account/profile/edit-profile/stress/index';
import SleepScreen from 'screens/main/account/profile/edit-profile/sleep';
import VaccinationScreen from 'screens/main/account/profile/edit-profile/vaccination';
import AllergiesScreen from 'screens/main/account/profile/edit-profile/allergies';
import DrinkingScreen from 'screens/main/account/profile/edit-profile/drinking';

import SCREENS from './constants';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* Account Stack */}
    <Stack.Group>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={SCREENS.DEPENDANTS}
        component={DependantsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={SCREENS.ADD_DEPENDANTS}
        component={AddDependantScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={SCREENS.EDIT_DEPENDANTS}
        component={EditDependantScreen}
      />
      {/* Settings */}
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.SETTINGS}
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.PASSWORD_CHANGED}
        component={PasswordChangeScreen}
      />
      <Stack.Screen
        name={SCREENS.PASSWORD_CHANGED_IN_APP}
        component={PasswordChanged}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.EMAIL_CHANGE}
        component={EmailChangeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.PHONE_NUMBER_CHANGE}
        component={PhoneChangeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.MARKETING_CONSENT}
        component={MarketingConsentScreen}
      />
      <Stack.Screen
        name={SCREENS.TERMS_AND_PRIVACY}
        component={TermsAndPrivacy}
      />
    </Stack.Group>
    {/* Profile Stack */}
    <Stack.Group>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.EDIT_PROFILE}
        component={EditProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.PERSONAL_INFORMATION}
        component={PersonalInformationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.BODY_MEASUREMENT}
        component={BodyMeasurementScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.MEDICAL_HISTORY}
        component={MedicalHistoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.FAMILY_MEDICAL_HISTORY}
        component={FamilyMedicalHistory}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.SMOKING}
        component={SmokingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.VACCINATION}
        component={VaccinationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.SLEEP}
        component={SleepScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.DRINKING}
        component={DrinkingScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.ALLERGIES}
        component={AllergiesScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.EXERCISE}
        component={ExerciseScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREENS.STRESS}
        component={Stress}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default AccountNavigator;
