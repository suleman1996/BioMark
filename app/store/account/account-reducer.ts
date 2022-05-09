import { AccountState } from './AccountState';
import { DEPENDENTS, BOOTSTRAP } from './constants';

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

    default:
      return state;
  }
}
