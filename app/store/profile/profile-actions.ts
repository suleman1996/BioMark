import { profileServices } from 'services/profile-services';
import { MedicalHistoryResponseData, Profile } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import {
  MEDICAL_HISTORY,
  MEDICAL_HISTORY_UPDATE,
  USER_PROFILE,
} from './constants';

export const addMedicalHistoryUpdate = (data: any) => ({
  type: MEDICAL_HISTORY_UPDATE,
  payload: data,
});

export const addMedicalHistoryData = (data: any) => ({
  type: MEDICAL_HISTORY,
  payload: data,
});

export const addUserProfileData = (data: any) => ({
  type: USER_PROFILE,
  payload: data,
});

export const getAndAddMedicalHistoryDataR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await profileServices
      .getAllMedicalHistoryData()
      .then(async (res: MedicalHistoryResponseData) => {
        logNow(' all medical history response for redux ============>', res);
        await dispatch(addMedicalHistoryData(res));
        await dispatch(addMedicalHistoryUpdate(res.personal));
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

export const getUserProfileData =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await profileServices
      .getUserProfile()
      .then(async (res: Profile) => {
        logNow(' all medical history response for redux ============>', res);
        await dispatch(addUserProfileData(res));
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
