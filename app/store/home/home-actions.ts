import { userService } from 'services/user-service/user-service';

import {
  HealthTrackerPayload,
  DashboardResponseData,
  MedicationSetupPayload,
  RiskData,
  MedicationListEntry,
  MedicationTrackerSetup,
  PspModule,
  PspModuleDataContents,
  LabStatusPayload,
} from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import {
  HEALTH_TRACKER,
  GET_DASHBOARD,
  MEDICAL_DROPDOWN,
  GET_HEALTH_RISK,
  MEDICATION_LIST,
  GET_NEW_MEDICATION_TRACKER,
  PSP_MODULE,
  PSP_PDF_LINK,
  GET_LAB_STATUS,
} from './constants';

export const addAllHealthTracker = (data: HealthTrackerPayload) => ({
  type: HEALTH_TRACKER,
  payload: data,
});
export const addMedicalDropDown = (data: MedicationSetupPayload) => ({
  type: MEDICAL_DROPDOWN,
  payload: data,
});
export const addMedicalList = (data: MedicationListEntry) => ({
  type: MEDICATION_LIST,
  payload: data,
});

export const addDashboard = (data: DashboardResponseData) => ({
  type: GET_DASHBOARD,
  payload: data,
});

export const addHealthRisks = (data: RiskData) => ({
  type: GET_HEALTH_RISK,
  payload: data,
});
export const addNewMedicationTracker = (data: MedicationTrackerSetup) => ({
  type: GET_NEW_MEDICATION_TRACKER,
  payload: data,
});
export const addPspModule = (data: PspModule) => ({
  type: PSP_MODULE,
  payload: data,
});

export const addPspPdfLink = (data: PspModuleDataContents) => ({
  type: PSP_PDF_LINK,
  payload: data,
});
export const addLabResultStatus = (data: LabStatusPayload) => ({
  type: GET_LAB_STATUS,
  payload: data,
});

export const getReduxHealthTracker =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHealthTracker()
      .then(async (res) => {
        // console.log('res', res);

        await dispatch(addAllHealthTracker(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxDashboard =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getDashboard()
      .then(async (res) => {
        // console.log('res', res);

        await dispatch(addDashboard(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxMedicalDropDown =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getMedicalDropDown()
      .then(async (res) => {
        console.log('MM', res);

        await dispatch(addMedicalDropDown(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxMedicationList =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getMedicationList()
      .then(async (res) => {
        console.log('MEDICATION LIST', res);

        await dispatch(addMedicalList(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getHealthTrackerRisks =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHealthRisks()
      .then(async (res) => {
        console.log('MM', res);

        await dispatch(addHealthRisks(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxNewMedicationTracker =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getNewMedicationTracker()
      .then(async (res) => {
        console.log('new med tracker', res);

        await dispatch(addNewMedicationTracker(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxPspModules =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getPspModules()
      .then(async (res) => {
        console.log('psp redux', res);
        await dispatch(addPspModule(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxPspPdfLink =
  (link: string) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getPspPdfLink(link)
      .then(async (res) => {
        console.log('psp redux', res);
        await dispatch(addPspPdfLink(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxLabResultStatus =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getLabResultStatus()
      .then(async (res) => {
        console.log('lab status', res);

        await dispatch(addLabResultStatus(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
