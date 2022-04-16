import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { GlobalColors } from '../utils/theme/globalColors';
import { Nav_Screens } from './constants';
import AccountScreen from '../screens/account/account-screen';
import AddDependantScreen from '../screens/account/dependants/add-dependant';
import DependantsScreen from '../screens/account/dependants';
import EditDependantScreen from '../screens/account/dependants/edit-dependant/index';
import EditProfileScreen from '../screens/profile/edit-profile';
import PersonalInformationScreen from '../screens/profile/personal-information';
import BodyMeasurementScreen from '../screens/profile/body-measurements';
import MedicalHistoryScreen from '../screens/profile/medical-history';

const Stack = createNativeStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator
    initialRouteName={Nav_Screens.Account_Screen}
    screenOptions={{
      headerShown: false,
    }}>
    {/* Account Stack */}
    <Stack.Group>
      <Stack.Screen
        name={Nav_Screens.Account_Screen}
        component={AccountScreen}
      />
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
    </Stack.Group>
  </Stack.Navigator>
);
