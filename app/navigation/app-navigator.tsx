import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CreateProfile from 'screens/auth/create-profile';
import HealthRisk from 'screens/main/home-page/health-risk';
import AccountNavigator from './account-navigator';
import BottomTabNavigator from './bottom-tab-navigator';

import { getAuthAsyncStorage } from 'services/async-storage/auth-async-storage';
import { loggedIn } from 'store/auth/auth-actions';
import { IAppState } from 'store/IAppState';
import YourHealth from '../screens/main/home-page/your-health/index';
import Hypertension from '../screens/main/home-page/your-health/hypertension-diary/index';
import HealthProgress from '../screens/main/home-page/your-health/health-progress/index';
import Targets from '../screens/main/home-page/your-health/health-progress/targets/index';
import SCREENS from './constants';
import BloodSugar from 'screens/main/home-page/your-health/health-trackers/blood-sugar/index';
import BloodPressure from 'screens/main/home-page/your-health/health-trackers/blood-pressure/index';
import Weight from 'screens/main/home-page/your-health/health-trackers/weight/index';
import HbA1c from 'screens/main/home-page/your-health/health-trackers/HbA1c/index';
import Medication from 'screens/main/home-page/your-health/health-trackers/Medication/index';
import Covid19Navigator from './covid19-navigator';
import SupportCenter from 'screens/main/home-page/support-center';
import EmpowerProgram from 'screens/main/home-page/empower-program';
import DiabetesSupportCenter from 'screens/main/home-page/diabetes-support-system';
import DiabetesCenter from 'screens/main/home-page/your-health/diabetes-center';

const Stack = createNativeStackNavigator();
const {
  NESTED_ACCOUNT_NAVIGATOR,
  CREATE_PROFILE,
  YOUR_HEALTH,
  NESTED_COVID19_NAVIGATOR,
  HEALTH_RISK,
  HYPERTENSION,
  BLOOD_SUGAR,
  SUPPORT_SYSTEM,
  EMPOWER_PROGRAM,
  DIABETES_SUPPORT_CENTER,
  DIABETES_CENTER,
  BLOOD_PRESSURE,
  WEIGHT,
  HBA1C,
  MEDICATION,
  HEALTH_PROGRESS,
  TARGETS,
} = SCREENS;

const AppNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.auth);
  const hasProfile = auth.hasProfile ? true : false;

  useEffect(() => {
    getHasProfileAsyncStorage();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getHasProfileAsyncStorage() {
    const data = await getAuthAsyncStorage();
    dispatch(loggedIn(data));
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {hasProfile ? (
        <>
          <Stack.Screen
            name={SCREENS.MAIN_NAVIGATOR}
            component={BottomTabNavigator}
          />
          <Stack.Screen
            name={NESTED_ACCOUNT_NAVIGATOR}
            component={AccountNavigator}
          />
          <Stack.Screen
            name={NESTED_COVID19_NAVIGATOR}
            component={Covid19Navigator}
          />
          <Stack.Screen name={HEALTH_RISK} component={HealthRisk} />
          <Stack.Screen name={YOUR_HEALTH} component={YourHealth} />
          <Stack.Screen name={HYPERTENSION} component={Hypertension} />
          <Stack.Screen name={BLOOD_SUGAR} component={BloodSugar} />
          <Stack.Screen name={SUPPORT_SYSTEM} component={SupportCenter} />
          <Stack.Screen name={EMPOWER_PROGRAM} component={EmpowerProgram} />
          <Stack.Screen name={DIABETES_CENTER} component={DiabetesCenter} />
          <Stack.Screen
            name={DIABETES_SUPPORT_CENTER}
            component={DiabetesSupportCenter}
          />
          <Stack.Screen name={BLOOD_PRESSURE} component={BloodPressure} />
          <Stack.Screen name={WEIGHT} component={Weight} />
          <Stack.Screen name={HBA1C} component={HbA1c} />
          <Stack.Screen name={MEDICATION} component={Medication} />
          <Stack.Screen name={HEALTH_PROGRESS} component={HealthProgress} />
          <Stack.Screen name={TARGETS} component={Targets} />
        </>
      ) : (
        <>
          <Stack.Screen name={CREATE_PROFILE} component={CreateProfile} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
