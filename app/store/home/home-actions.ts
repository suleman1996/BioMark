import { userService } from 'services/user-service/user-service';
import { HealthTrackerPayload, MedicationSetupPayload } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import { HEALTH_TRACKER, MEDICAL_DROPDOWN } from './constants';

export const addAllHealthTracker = (data: HealthTrackerPayload) => ({
  type: HEALTH_TRACKER,
  payload: data,
});
export const addMedicalDropDown = (data: MedicationSetupPayload) => ({
  type: MEDICAL_DROPDOWN,
  payload: data,
});

export const getReduxHealthTracker =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getHealthTracker()
      .then(async (res) => {
        console.log('res', res);

        await dispatch(addAllHealthTracker(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
export const getReduxMedicalDropDown =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await userService
      .getMedicalDropDown()
      .then(async (res) => {
        console.log('MM', res);

        await dispatch(addMedicalDropDown(res));
      })
      .catch((err) => {
        logNow(err);
      });
  };
