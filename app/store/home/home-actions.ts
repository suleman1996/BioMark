import { userService } from 'services/user-service/user-service';
import { HealthTrackerPayload } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import { HEALTH_TRACKER } from './constants';

export const addAllHealthTracker = (data: HealthTrackerPayload) => ({
  type: HEALTH_TRACKER,
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
