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
  ResultResponse,
  EncodedResultOverviewPayload,
  LabStatusResponse,
  NewTarget,
  LatestTargetResponse,
  GetBloodSugarTargetsResponseData,
  GetHba1cTargetsResponseData,
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
  GET_RESULT_OVERVIEW,
  GET_LATEST_RESULT,
  GET_PAST_RESULT,
  GET_NEW_TARGET,
  GET_LATEST_TARGET,
  GET_BLOOD_SUGAR_TARGETS,
  GET_HBA1C_TARGETS,
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
export const showLatestResult = (data: EncodedResultOverviewPayload) => ({
  type: GET_LATEST_RESULT,
  payload: data,
});
export const showPastResult = (data: LabStatusResponse) => ({
  type: GET_PAST_RESULT,
  payload: data,
});
export const addLabResultStatus = (data: LabStatusPayload) => ({
  type: GET_LAB_STATUS,
  payload: data,
});

export const getResultOverView = (data: ResultResponse) => ({
  type: GET_RESULT_OVERVIEW,
  payload: data,
});

export const getUnits = (data: NewTarget) => ({
  type: GET_NEW_TARGET,
  payload: data,
});

export const getLatestTargetsCreator = (data: LatestTargetResponse) => ({
  type: GET_LATEST_TARGET,
  payload: data,
});

export const getBloodSugarTargetsCreator = (
  data: GetBloodSugarTargetsResponseData[]
) => ({
  type: GET_BLOOD_SUGAR_TARGETS,
  payload: data,
});

export const getHBA1CTargetsCreator = (
  data: GetHba1cTargetsResponseData[]
) => ({
  type: GET_HBA1C_TARGETS,
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

export const getReduxLatestResult =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getLatestResult()
      .then(async (res) => {
        console.log('latest show result', res);
        await dispatch(showLatestResult(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxPastResult =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getPastResult()
      .then(async (res) => {
        console.log('past show result', res);
        await dispatch(showPastResult(res));
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

export const getReduxResultOverview =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getResultOverView(140)
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getResultOverView(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getNewTargetAction =
  () =>
  async (dispatch: (arg0: { type: string; payload?: NewTarget }) => void) => {
    await userService
      .getNewTarget()
      .then((res) => {
        console.log({ res: res.hba1c_unit });
        dispatch(getUnits(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getLatestTargetsAction =
  () =>
  async (
    dispatch: (arg0: { type: string; payload?: LatestTargetResponse }) => void
  ) => {
    await userService
      .getLatestTargets()
      .then((res) => dispatch(getLatestTargetsCreator(res)))
      .catch((err) => {
        logNow(err);
      });
  };

export const getBloodSugarTargetsAction =
  () =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: GetBloodSugarTargetsResponseData[];
    }) => void
  ) => {
    await userService
      .getBloodSugarTargets()
      .then((res) => {
        console.log({ res: res.length });
        dispatch(getBloodSugarTargetsCreator(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getHBA1CTargetsAction =
  () =>
  async (
    dispatch: (arg0: {
      type: string;
      payload?: GetHba1cTargetsResponseData[];
    }) => void
  ) => {
    await userService
      .getHBA1CTargets()
      .then((res) => dispatch(getHBA1CTargetsCreator(res)))
      .catch((err) => {
        logNow(err);
      });
  };
