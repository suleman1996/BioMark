import { COVID_RESULTS_DATA } from './constants';
import { CovidState } from './CovidState';

const INITIAL_STATE = new CovidState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case COVID_RESULTS_DATA: {
      return {
        ...state,
        allCovidResults: action.payload,
      };
    }

    default:
      return state;
  }
}
