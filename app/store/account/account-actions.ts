import { dependentService } from 'services/account-service/dependent-service';
import { DependentData } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';
import { DEPENDENTS } from './constants';

export const addAllDependents = (data: DependentData) => ({
  type: DEPENDENTS,
  payload: data,
});

export const getAllDependents =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await dependentService
      .getAllDependents()
      .then(async (res: any) => {
        logNow(res);
        await dispatch(addAllDependents(res));
      })
      .catch(() => {
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
        const empty: any = [];
        dispatch(addAllDependents(empty));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };
