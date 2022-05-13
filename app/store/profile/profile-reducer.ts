import { MEDICAL_HISTORY_UPDATE } from './constants';
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

    default:
      return state;
  }
}
