import {
  MEDICAL_HISTORY,
  MEDICAL_HISTORY_UPDATE,
  USER_PROFILE,
  FAMILY_MEDICAL_HISTORY_UPDATE,
  ALLERGIES_MEDICAL_HISTORY_UPDATE,
  ALLERGIES_CONDITIONS_UPDATE,
} from './constants';
import { ProfileState } from './ProfileState';

const INITIAL_STATE = new ProfileState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case MEDICAL_HISTORY_UPDATE: {
      return {
        ...state,
        medicalHistoryUpdate: action.payload,
      };
    }

    case FAMILY_MEDICAL_HISTORY_UPDATE: {
      return {
        ...state,
        familyMedicalHistoryUpdate: action.payload,
      };
    }

    case ALLERGIES_MEDICAL_HISTORY_UPDATE: {
      return {
        ...state,
        allergiesMedicalHistoryUpdate: action.payload,
      };
    }

    case ALLERGIES_CONDITIONS_UPDATE: {
      return {
        ...state,
        allergiesMedicalHistoryUpdate: {
          ...state.allergiesMedicalHistoryUpdate,
          conditions: action.payload,
        },
      };
    }

    case MEDICAL_HISTORY: {
      return {
        ...state,
        medicalHistoryData: action.payload,
      };
    }

    case USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }

    default:
      return state;
  }
}
