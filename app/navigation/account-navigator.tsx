import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { GlobalColors } from '../utils/theme/globalColors';
import { Nav_Screens } from './constants';
import AccountScreen from '../screens/main/account/account-screen';
import EditProfileScreen from '../screens/main/account/profile/edit-profile';
import PersonalInformationScreen from '../screens/main/account/profile/personal-information';
import BodyMeasurementScreen from '../screens/main/account/profile/body-measurements';
import MedicalHistoryScreen from '../screens/main/account/profile/medical-history';
import DependantsScreen from '../screens/main/account/dependants';
import AddDependantScreen from '../screens/main/account/dependants/add-dependant';
import EditDependantScreen from '../screens/main/account/dependants/edit-dependant';
import SmokingScreen from '../screens/main/account/profile/edit-profile/smoking';
import VaccinationScreen from '../screens/main/account/profile/edit-profile/vaccination';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    {/* Account Stack */}
    <Stack.Group>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={Nav_Screens.Dependants_Screen}
        component={DependantsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={Nav_Screens.Add_Dependants}
        component={AddDependantScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTintColor: GlobalColors.darkPrimary,
          title: 'Dependants',
        }}
        name={Nav_Screens.Edit_Dependants}
        component={EditDependantScreen}
      />
    </Stack.Group>
    {/* Profile Stack */}
    <Stack.Group>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Edit_Profile}
        component={EditProfileScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Personal_Information}
        component={PersonalInformationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Body_Measurement}
        component={BodyMeasurementScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Medical_History}
        component={MedicalHistoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Smoking}
        component={SmokingScreen}
      />
        <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={Nav_Screens.Vaccination}
        component={VaccinationScreen}
      />
    </Stack.Group>
  </Stack.Navigator>
);
