import { HomeState } from './HomeState';
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
    case PSP_PDF_LINK: {
      return {
        ...state,
        PspDataContents: action.payload,
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

    default:
      return state;
  }
}
