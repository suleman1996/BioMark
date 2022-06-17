import { AccountState } from './AccountState';
import {
  DEPENDENTS,
  BOOTSTRAP,
  LOCATION,
  WORK_FLOW_EXECUTION_ID,
} from './constants';

const INITIAL_STATE = new AccountState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case DEPENDENTS: {
      return {
        ...state,
        allDependents: action.payload,
      };
    }

    case BOOTSTRAP: {
      return {
        ...state,
        bootstrap: action.payload,
      };
    }

    case LOCATION: {
      return {
        ...state,
        geolocation: action.payload,
      };
    }
    case WORK_FLOW_EXECUTION_ID: {
      return {
        ...state,
        executionId: action.payload,
      };
    }

    default:
      return state;
  }
}
