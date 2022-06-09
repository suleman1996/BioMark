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
  HealthTrackerPayloadData,
  WeightProgressEntryPayload,
  BloodPressureProgressEntryPayload,
  BloodSugarProgressEntryPayload,
  Hba1CProgressEntryPayload,
  WeightProgressLogsPayload,
  BloodSugarProgressLogsPayload,
  Hba1CProgressLogsPayload,
  BloodPressureProgressLogsPayload,
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
  GET_PSP_HYPERTENSION_HEALTH_TRACKER,
  PSP_HYPER_MODULE,
  PSP_PDF_HYPER_LINK,
  GET_WEIGHT_PROGRESS,
  GET_BP_PROGRESS,
  GET_BS_PROGRESS,
  GET_HBA1C_PROGRESS,
  GET_MEDICATION_PROGRESS,
  GET_RESULT_LOGS,
  GET_BLOOD_SUGAR_LOGS,
  GET_HBA1C_LOGS,
  GET_BP_LOGS,
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

export const addPspHyperModule = (data: PspModule) => ({
  type: PSP_HYPER_MODULE,
  payload: data,
});

export const showPspHypertensionHealthTracker = (
  data: HealthTrackerPayloadData
) => ({
  type: GET_PSP_HYPERTENSION_HEALTH_TRACKER,
  payload: data,
});

export const addPspPdfLink = (data: PspModuleDataContents) => ({
  type: PSP_PDF_LINK,
  payload: data,
});
export const addPspPdfHyperLink = (data: PspModuleDataContents) => ({
  type: PSP_PDF_HYPER_LINK,
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
export const getWeightProgress = (data: WeightProgressEntryPayload) => ({
  type: GET_WEIGHT_PROGRESS,
  payload: data,
});
export const getBloodPressureProgress = (
  data: BloodPressureProgressEntryPayload
) => ({
  type: GET_BP_PROGRESS,
  payload: data,
});
export const getBloodSugarProgress = (
  data: BloodSugarProgressEntryPayload
) => ({
  type: GET_BS_PROGRESS,
  payload: data,
});
export const getHba1cProgress = (data: Hba1CProgressEntryPayload) => ({
  type: GET_HBA1C_PROGRESS,
  payload: data,
});
export const getMedicationProgress = (data: Hba1CProgressEntryPayload) => ({
  type: GET_MEDICATION_PROGRESS,
  payload: data,
});

export const getWeightLogs = (data: WeightProgressLogsPayload) => ({
  type: GET_RESULT_LOGS,
  payload: data,
});

export const getBloodSuarLogs = (data: BloodSugarProgressLogsPayload) => ({
  type: GET_BLOOD_SUGAR_LOGS,
  payload: data,
});
export const getHba1cLogs = (data: Hba1CProgressLogsPayload) => ({
  type: GET_HBA1C_LOGS,
  payload: data,
});
export const getBPLogs = (data: BloodPressureProgressLogsPayload) => ({
  type: GET_BP_LOGS,
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

export const getReduxPspHyperModules =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getPspHyperModules()
      .then(async (res) => {
        console.log('psp hyper redux', res);
        await dispatch(addPspHyperModule(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxPspHypertensionHealthTrackerData =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHypertensionHealthTracker()
      .then(async (res) => {
        console.log('hyper health tracker redux', res);
        await dispatch(showPspHypertensionHealthTracker(res));
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
export const getReduxPspPdfHyperLink =
  (link: string) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getPspHyperPdfLink(link)
      .then(async (res) => {
        console.log('psp pdf hyper link redux', res);
        await dispatch(addPspPdfHyperLink(res));
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
  (id, title) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getResultOverView(id, title)
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getResultOverView(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxWeightProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getWeightProgress(id)
      .then(async (res) => {
        console.log('Result progress', res);
        await dispatch(getWeightProgress(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxWeightLogs =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getWeightLogs()
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getWeightLogs(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxBloodPressurProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodPressureProgress(id)
      .then(async (res) => {
        console.log('Result progress', res);

        await dispatch(getBloodPressureProgress(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxBloodSugarLogs =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodSugarLogs()
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getBloodSuarLogs(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxBloodSugarProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodSugarProgress(id)
      .then(async (res) => {
        console.log('BS progress', res);

        await dispatch(getBloodSugarProgress(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxHba1cLogs =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHba1cLogs()
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getHba1cLogs(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxHba1cProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHba1cProgress(id)
      .then(async (res) => {
        console.log('HB progress', res);

        await dispatch(getHba1cProgress(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxMedicationProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getMedicationProgress(id)
      .then(async (res) => {
        console.log('MED progress', res);

        await dispatch(getMedicationProgress(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxBloodPressureLogs =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodPressureLogs()
      .then(async (res) => {
        // console.log('Result Overview', res);

        await dispatch(getBPLogs(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
