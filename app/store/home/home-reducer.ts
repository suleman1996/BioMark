import { HomeState } from './HomeState';
import { HEALTH_TRACKER } from './constants';

const INITIAL_STATE = new HomeState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case HEALTH_TRACKER: {
      return {
        ...state,
        healthTracker: action.payload,
      };
    }

    default:
      return state;
  }
}
