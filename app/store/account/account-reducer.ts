import { AccountState } from './AccountState';
import { DEPENDENTS, BOOTSTRAPPER } from './constants';

const INITIAL_STATE = new AccountState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case DEPENDENTS: {
      return {
        ...state,
        allDependents: action.payload,
      };
    }
    case BOOTSTRAPPER: {
      return {
        ...state,
        allBootStrapper: action.payload,
      };
    }

    default:
      return state;
  }
}
