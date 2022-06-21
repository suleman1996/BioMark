import { userService } from 'services/user-service/user-service';
import { HIDE_LOADER, SHOW_LOADER } from 'store/events/constants';

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
  HealthTrackerPayloadData,
  WeightProgressEntryPayload,
  BloodPressureProgressEntryPayload,
  BloodSugarProgressEntryPayload,
  Hba1CProgressEntryPayload,
  WeightProgressLogsPayload,
  BloodSugarProgressLogsPayload,
  Hba1CProgressLogsPayload,
  BloodPressureProgressLogsPayload,
  HealthFeed,
  LabUploadPayload,
  MedicationTracker,
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
  GET_PENDING_RESULT_OVERVIEW,
  GET_MEDICATION_TRACKER,
  GET_HEALTH_FEEDS,
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
export const getHealthFeeds = (data: HealthFeed) => ({
  type: GET_HEALTH_FEEDS,
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
export const getPendingResultOverview = (data: LabUploadPayload) => ({
  type: GET_PENDING_RESULT_OVERVIEW,
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

export const getWeightLogs = (
  data: WeightProgressLogsPayload,
  page: number
) => ({
  type: GET_RESULT_LOGS,
  payload: { data, page },
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

export const getMedicationsTrackerCreator = (data: MedicationTracker) => ({
  type: GET_MEDICATION_TRACKER,
  payload: data,
});

export const getReduxHealthTracker =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHealthTracker()
      .then(async (res) => {
        //
        console.log('result from getHealthTracker:', { res });
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
        dispatch(addDashboard(res));
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
        await dispatch(addMedicalDropDown(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxHealthFeeds =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHealthFeeds()
      .then(async (res) => {
        await dispatch(getHealthFeeds(res));
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
        await dispatch(showPastResult(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxPendingResultOverview =
  (id: number) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getLabUploadResult(id)
      .then(async (res) => {
        await dispatch(getPendingResultOverview(res));
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
        //

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
        dispatch(getUnits(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxWeightProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: SHOW_LOADER });
    await userService
      .getWeightProgress(id)
      .then(async (res) => {
        await dispatch(getWeightProgress(res));
        dispatch({ type: HIDE_LOADER });
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
export const getReduxWeightLogs =
  (params: { type: string; metric: boolean } | undefined) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getWeightLogs(params)
      .then(async (res) => {
        await dispatch(getWeightLogs(res, 1));
      })
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
        dispatch(getBloodSugarTargetsCreator(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxBloodPressurProgress =
  (id) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch({ type: SHOW_LOADER });
    await userService
      .getBloodPressureProgress(id)
      .then(async (res) => {
        await dispatch(getBloodPressureProgress(res));
        dispatch({ type: HIDE_LOADER });
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxBloodSugarLogs =
  (params: { meal?: string; unit?: number } | undefined) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodSugarLogs(params)
      .then(async (res) => {
        //
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
        //

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
        await dispatch(getMedicationProgress(res));
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

export const getReduxBloodPressureLogs =
  (params?: { type: string } | undefined) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBloodPressureLogs(params)
      .then(async (res) => {
        dispatch(getBPLogs(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getMedicationsTrackersAction =
  (date: string) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getMedicationTrackers(date)
      .then(async (res) => {
        dispatch(getMedicationsTrackerCreator(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
