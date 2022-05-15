import {
  MEDICAL_HISTORY,
  MEDICAL_HISTORY_UPDATE,
  USER_PROFILE,
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
