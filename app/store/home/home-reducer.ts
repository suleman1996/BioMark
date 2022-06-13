import { HomeState } from './HomeState';
import {
  HEALTH_TRACKER,
  GET_DASHBOARD,
  MEDICAL_DROPDOWN,
  GET_HEALTH_RISK,
  MEDICATION_LIST,
  GET_NEW_MEDICATION_TRACKER,
  PSP_MODULE,
  PSP_HYPER_MODULE,
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
} from './constants';

const INITIAL_STATE = new HomeState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case HEALTH_TRACKER: {
      return {
        ...state,
        healthTracker: action.payload,
      };
    }
    case GET_DASHBOARD: {
      return {
        ...state,
        dashboard: action.payload,
      };
    }
    case MEDICAL_DROPDOWN: {
      return {
        ...state,
        medicalDropDown: action.payload,
      };
    }
    case GET_HEALTH_RISK: {
      return {
        ...state,
        healthRisks: action.payload,
      };
    }
    case MEDICATION_LIST: {
      return {
        ...state,
        medicationList: action.payload,
      };
    }
    case GET_NEW_MEDICATION_TRACKER: {
      return {
        ...state,
        getNewMedicationTracker: action.payload,
      };
    }
    case PSP_MODULE: {
      return {
        ...state,
        pspModuleData: action.payload,
      };
    }
    case PSP_HYPER_MODULE: {
      return {
        ...state,
        pspHyperModuleData: action.payload,
      };
    }
    case GET_PSP_HYPERTENSION_HEALTH_TRACKER: {
      return {
        ...state,
        pspHypertensionHealthTracker: action.payload,
      };
    }
    case PSP_PDF_LINK: {
      return {
        ...state,
        PspDataContents: action.payload,
      };
    }
    case PSP_PDF_HYPER_LINK: {
      return {
        ...state,
        PspHyperDataContents: action.payload,
      };
    }
    case GET_LAB_STATUS: {
      return {
        ...state,
        getLabStatusData: action.payload,
      };
    }
    case GET_RESULT_OVERVIEW: {
      return {
        ...state,
        getResultOverViewData: action.payload,
      };
    }
    case GET_LATEST_RESULT: {
      return {
        ...state,
        getLatestResultData: action.payload,
      };
    }
    case GET_PAST_RESULT: {
      return {
        ...state,
        getPastResultData: action.payload,
      };
    }
    case GET_PENDING_RESULT_OVERVIEW: {
      return {
        ...state,
        getPendingResultOverviewData: action.payload,
      };
    }
    case GET_NEW_TARGET: {
      return {
        ...state,
        bloodSugarUnits: action.payload.blood_sugar_unit,
        hbA1cUnits: action.payload.hba1c_unit,
      };
    }
    case GET_LATEST_TARGET: {
      return {
        ...state,
        latestBloodSugar: action.payload.blood_sugar,
        latestHba1c: action.payload.hba1c,
      };
    }
    case GET_BLOOD_SUGAR_TARGETS: {
      return {
        ...state,
        bloodSugarTargets: action.payload,
      };
    }
    case GET_HBA1C_TARGETS: {
      return {
        ...state,
        hbA1cTargets: action.payload,
      };
    }

    case GET_WEIGHT_PROGRESS: {
      return {
        ...state,
        getWeightProgressData: action.payload,
      };
    }
    case GET_BP_PROGRESS: {
      return {
        ...state,
        getBpProgressData: action.payload,
      };
    }
    case GET_BS_PROGRESS: {
      return {
        ...state,
        getBsProgressData: action.payload,
      };
    }
    case GET_HBA1C_PROGRESS: {
      return {
        ...state,
        getHba1cProgressData: action.payload,
      };
    }
    case GET_MEDICATION_PROGRESS: {
      return {
        ...state,
        getMedicationProgressData: action.payload,
      };
    }
    case GET_RESULT_LOGS: {
      return {
        ...state,
        weightLogsData: action.payload,
      };
    }
    case GET_BLOOD_SUGAR_LOGS: {
      return {
        ...state,
        bloodSugarLogsData: action.payload,
      };
    }
    case GET_HBA1C_LOGS: {
      return {
        ...state,
        hba1cLogsData: action.payload,
      };
    }
    case GET_BP_LOGS: {
      return {
        ...state,
        bPLogsData: action.payload,
      };
    }

    default:
      return state;
  }
}
