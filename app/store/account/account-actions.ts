import { dependentService } from 'services/account-service/dependent-service';
import { userService } from 'services/user-service/user-service';
import { BootstrapData, GeoLocationData } from 'types/api';
import { DependentData } from 'types/api/dependent';
import { logNow } from 'utils/functions/log-binder';
import { DEPENDENTS, BOOTSTRAP, LOCATION } from './constants';

export const addAllDependents = (data: DependentData) => ({
  type: DEPENDENTS,
  payload: data,
});

export const addAllBootstrapDataInRedux = (data: BootstrapData) => ({
  type: BOOTSTRAP,
  payload: data,
});
export const addAllLocationDataInRedux = (data: GeoLocationData) => ({
  type: LOCATION,
  payload: data,
});

export const getAllDependents =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await dependentService
      .getAllDependents()
      .then(async (res: any) => {
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

export const getReduxBootstrap =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getBootstrap()
      .then(async (res) => {
        await dispatch(addAllBootstrapDataInRedux(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };

export const getReduxLocation =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .geoLocation()
      .then(async (res) => {
        await dispatch(addAllLocationDataInRedux(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
