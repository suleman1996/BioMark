import { covidService } from 'services/covid-service';
import { CovidResultListResponse } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import { COVID_RESULTS_DATA } from './constants';

export const addAllCovidResultsData = (data: CovidResultListResponse[]) => ({
  type: COVID_RESULTS_DATA,
  payload: data,
});

export const getAllCovidResultsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await covidService
      .getCovidResults()
      .then(async (res: any) => {
        logNow('response for redux ============>', res);
        await dispatch(addAllCovidResultsData(res));
      })
      .catch((err) => {
        logNow(err);
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };
