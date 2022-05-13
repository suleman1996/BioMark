import { AccountState } from './AccountState';
import { DEPENDENTS, BOOTSTRAP, LOCATION } from './constants';

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

    default:
      return state;
  }
}
