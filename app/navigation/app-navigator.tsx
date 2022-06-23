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
import YourHealth from 'screens/main/home-page/your-health/index';
import Hypertension from 'screens/main/home-page/your-health/hypertension-diary/index';
import PdfHypertension from 'screens/main/home-page/your-health/hypertension-diary/pdf-hypertension/index';
import HealthProgress from 'screens/main/home-page/your-health/health-progress/index';
import Targets from 'screens/main/home-page/your-health/health-progress/targets/index';
import AddBloodSugar from 'screens/main/home-page/your-health/health-progress/targets/add-blood-sugar/index';
import AddHba1c from 'screens/main/home-page/your-health/health-progress/targets/add-hba1c/index';
import DeviceConnection from 'screens/main/home-page/device-connection';
import SCREENS from './constants';
import BloodSugar from 'screens/main/home-page/your-health/health-trackers/blood-sugar/index';
import BloodPressure from 'screens/main/home-page/your-health/health-trackers/blood-pressure/index';
import Weight from 'screens/main/home-page/your-health/health-trackers/weight/index';
import HbA1c from 'screens/main/home-page/your-health/health-trackers/HbA1c/index';
import Medication from 'screens/main/home-page/your-health/health-trackers/medication';
import ShowMedication from 'screens/main/home-page/your-health/health-progress/medication';
import AddNewMedication from 'screens/main/home-page/your-health/health-trackers/medication-form';
import EditMedication from 'screens/main/home-page/your-health/health-trackers/edit-medication';
import Covid19Navigator from './covid19-navigator';
import SupportCenter from 'screens/main/home-page/support-center';
import EmpowerProgram from 'screens/main/home-page/empower-program';
import DiabetesSupportCenter from 'screens/main/home-page/diabetes-support-system';
import DiabetesCenter from 'screens/main/home-page/your-health/diabetes-center';
import VideoList from 'screens/main/home-page/your-health/diabetes-center/video-list';
import PdfHypertensionSupportCenter from 'screens/main/home-page/your-health/hypertension-diary/pdf-hypertension/index';
import VideoHypertensionList from 'screens/main/home-page/your-health/hypertension-diary/video';
import FamilyMedicalHistory from 'screens/main/account/profile/family-medical-history';
import {
  getReduxPspModules,
  getReduxPspPdfLink,
  getReduxLatestResult,
  getReduxPastResult,
  getReduxPspHypertensionHealthTrackerData,
  getReduxPspHyperModules,
  getReduxPspPdfHyperLink,
  getReduxPendingResultOverview,
  getLatestTargetsAction,
  getNewTargetAction,
} from 'store/home/home-actions';
import PdfDiabetesSupportCenter from 'screens/main/home-page/your-health/diabetes-center/pdf-diabetes-support-center';
import HealthRecord from 'screens/main/home-page/your-health/health-records';
import ResultOverView from 'screens/main/home-page/your-health/health-records/result-overview/index';
import SearchResult from 'screens/main/home-page/your-health/health-records/result-overview/search/index';
import SeeResult from 'screens/main/home-page/your-health/health-records/result-overview/see-report/index';
import ResultUpload from 'screens/main/home-page/your-health/health-records/upload-results';
import MoreInfo from 'screens/main/home-page/your-health/health-records/result-overview/more-info';
import PendingResultOverview from 'screens/main/home-page/your-health/health-records/pending-result-overview';
import TermsAndPrivacy from 'screens/auth/terms-and-privacy';
import SmokingScreen from 'screens/main/account/profile/edit-profile/smoking';
import StressScreen from 'screens/main/account/profile/edit-profile/stress/index';
import Sleep from 'screens/main/account/profile/edit-profile/sleep';
import Drinking from 'screens/main/account/profile/edit-profile/drinking';
import BodyMeasurementScreen from 'screens/main/account/profile/body-measurements';
import ExerciseScreen from 'screens/main/account/profile/edit-profile/exercise';
import MedicalHistoryScreen from 'screens/main/account/profile/medical-history';

const Stack = createNativeStackNavigator();
const {
  NESTED_ACCOUNT_NAVIGATOR,
  CREATE_PROFILE,
  YOUR_HEALTH,
  NESTED_COVID19_NAVIGATOR,
  HEALTH_RISK,
  HYPERTENSION,
  PDF_HYPERTENSION,
  BLOOD_SUGAR,
  SUPPORT_SYSTEM,
  EMPOWER_PROGRAM,
  DIABETES_SUPPORT_CENTER,
  DIABETES_CENTER,
  BLOOD_PRESSURE,
  WEIGHT,
  HBA1C,
  MEDICATION,
  SHOW_MEDICATION,
  ADD_NEW_MEDICATION,
  HEALTH_PROGRESS,
  TARGETS,
  ADD_BLOOD_SUGAR,
  ADD_HBA1C,
  PDF_DIABETES_SUPPORT,
  HEALTH_RECORD,
  RESULT_OVERVIEW,
  EDIT_MEDICATION,
  RESULT_UPLOAD,
  MORE_INFO,
  PDF_HYPERTENSION_SUPPORT,
  PENDING_RESULT_OVERVIEW,
  SEE_REPORT,
  SEARCH_RESULT,
  DEVICE_CONNECTION,
  BODY_MEASUREMENT,
  MEDICAL_HISTORY,
} = SCREENS;

const AppNavigator = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IAppState) => state.auth);
  const hasProfile = auth.hasProfile ? true : false;

  useEffect((link: string, id: number) => {
    getHasProfileAsyncStorage();
    dispatch(getReduxPspModules());
    dispatch(getReduxPspPdfLink(link));
    dispatch(getReduxPspPdfHyperLink(link));
    dispatch(getReduxLatestResult());
    dispatch(getReduxPastResult());
    dispatch(getReduxPspHypertensionHealthTrackerData());
    dispatch(getReduxPspHyperModules());
    dispatch(getReduxPendingResultOverview(id));
    dispatch(getLatestTargetsAction());
    dispatch(getNewTargetAction());
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
          <Stack.Screen name={PDF_HYPERTENSION} component={PdfHypertension} />
          <Stack.Screen name={HEALTH_RECORD} component={HealthRecord} />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={SCREENS.VIDEO_LIST}
            component={VideoList}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name={SCREENS.VIDEO_HYPERTENSION_LIST}
            component={VideoHypertensionList}
          />
          <Stack.Screen
            name={PDF_DIABETES_SUPPORT}
            component={PdfDiabetesSupportCenter}
          />
          <Stack.Screen
            name={PDF_HYPERTENSION_SUPPORT}
            component={PdfHypertensionSupportCenter}
          />
          <Stack.Screen name={BLOOD_SUGAR} component={BloodSugar} />
          <Stack.Screen name={SUPPORT_SYSTEM} component={SupportCenter} />
          <Stack.Screen name={EMPOWER_PROGRAM} component={EmpowerProgram} />
          <Stack.Screen name={DIABETES_CENTER} component={DiabetesCenter} />
          <Stack.Screen
            name={DIABETES_SUPPORT_CENTER}
            component={DiabetesSupportCenter}
          />

          <Stack.Screen name={SCREENS.SMOKING} component={SmokingScreen} />
          <Stack.Screen name={SCREENS.STRESS} component={StressScreen} />
          <Stack.Screen name={SCREENS.SLEEP} component={Sleep} />
          <Stack.Screen name={SCREENS.DRINKING} component={Drinking} />
          <Stack.Screen name={SCREENS.EXERCISE} component={ExerciseScreen} />
          <Stack.Screen name={BLOOD_PRESSURE} component={BloodPressure} />
          <Stack.Screen
            name={MEDICAL_HISTORY}
            component={MedicalHistoryScreen}
          />
          <Stack.Screen
            name={BODY_MEASUREMENT}
            component={BodyMeasurementScreen}
          />
          <Stack.Screen
            name={SCREENS.FAMILY_MEDICAL_HISTORY}
            component={FamilyMedicalHistory}
          />
          <Stack.Screen name={WEIGHT} component={Weight} />
          <Stack.Screen name={HBA1C} component={HbA1c} />
          <Stack.Screen name={MEDICATION} component={Medication} />
          <Stack.Screen name={SHOW_MEDICATION} component={ShowMedication} />
          <Stack.Screen name={EDIT_MEDICATION} component={EditMedication} />
          <Stack.Screen
            name={ADD_NEW_MEDICATION}
            component={AddNewMedication}
          />
          <Stack.Screen name={HEALTH_PROGRESS} component={HealthProgress} />
          <Stack.Screen name={TARGETS} component={Targets} />
          <Stack.Screen name={ADD_BLOOD_SUGAR} component={AddBloodSugar} />
          <Stack.Screen name={ADD_HBA1C} component={AddHba1c} />
          <Stack.Screen name={RESULT_OVERVIEW} component={ResultOverView} />
          <Stack.Screen name={SEARCH_RESULT} component={SearchResult} />
          <Stack.Screen name={MORE_INFO} component={MoreInfo} />
          <Stack.Screen name={RESULT_UPLOAD} component={ResultUpload} />
          <Stack.Screen
            name={PENDING_RESULT_OVERVIEW}
            component={PendingResultOverview}
          />
          <Stack.Screen name={SEE_REPORT} component={SeeResult} />
          <Stack.Screen name={DEVICE_CONNECTION} component={DeviceConnection} />
        </>
      ) : (
        <>
          <Stack.Screen name={CREATE_PROFILE} component={CreateProfile} />
          <Stack.Screen
            name={SCREENS.TERMS_AND_PRIVACY}
            component={TermsAndPrivacy}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
