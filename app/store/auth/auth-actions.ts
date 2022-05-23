import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { userService } from 'services/user-service/user-service';
import { DeviceRegister } from 'types/auth/DeviceRegisterResponse';
import { LoginErrorResponse, LoginResponse } from 'types/auth/LoginResponse';
import { UserContacts } from 'types/UserContacts';
import { logNow } from 'utils/functions/log-binder';
import { MarketingType } from 'types/Marketing';
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGED_IN_HAS_PROFILE,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  AUTH_USER,
  DEVICE_REG,
  USER_CONTACTS,
  MARKETING,
} from './constants';
import { resetAuthAsyncStorage } from 'services/async-storage/auth-async-storage';

export const loggingIn = (logging: boolean) => ({
  type: AUTH_LOGGING_IN,
  payload: logging,
});

export const loggedIn = (data: any) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const loggedInHasProfile = (data: boolean) => ({
  type: AUTH_LOGGED_IN_HAS_PROFILE,
  payload: data,
});

export const deviceReg = (data: any) => ({
  type: DEVICE_REG,
  payload: data,
});

export const addUserDetails = (data: any) => ({
  type: AUTH_USER,
  payload: data,
});

export const errorLogIn = (errorMessage: string) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const addUserContactsDetails = (data: UserContacts) => ({
  type: USER_CONTACTS,
  payload: data,
});

export const setMarketing = (data: MarketingType) => ({
  type: MARKETING,
  payload: data,
});

export const reduxLogin =
  (username: string, password: string) =>
  (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch(loggingIn(true));
    userService
      .login(username, password)
      .then(async (res: LoginResponse) => {
        logNow('auth reducer ==>', res);
        const userToken = res?.access_token;
        const refreshToken = res?.refresh_token;
        const isFirstLogin = res?.first_login;
        const hasProfile = res?.has_profile;
        const expiresIin = res?.expires_in;
        await dispatch(
          loggedIn({
            userToken,
            refreshToken,
            isFirstLogin,
            hasProfile,
            expiresIin,
          })
        );
        let uniqueId = DeviceInfo.getUniqueId();
        await dispatch(reduxDeviceRegister(uniqueId, Platform.OS));
      })
      .catch((err: LoginErrorResponse) => {
        logNow('User auth login redux action error block', err);
        dispatch(errorLogIn(err.errMsg.data.error));
      })
      .finally(async () => {
        dispatch(loggingIn(false));
      });
  };
export const reduxFederatedLogin =
  (access_token: string, provider: string) =>
  (dispatch: (arg0: { type: string; payload: any }) => void) => {
    userService
      .federatedlogin(access_token, provider)
      .then(async (res: LoginResponse) => {
        logNow('auth reducer ==>', res);
        const userToken = res?.access_token;
        const refreshToken = res?.refresh_token;
        const isFirstLogin = res?.first_login;
        const hasProfile = res?.has_profile;
        const expiresIin = res?.expires_in;
        await dispatch(
          loggedIn({
            userToken,
            refreshToken,
            isFirstLogin,
            hasProfile,
            expiresIin,
          })
        );
        let uniqueId = DeviceInfo.getUniqueId();
        await dispatch(reduxDeviceRegister(uniqueId, Platform.OS));
      })
      .catch((err: LoginErrorResponse) => {
        logNow('User auth login redux action error block', err);
        dispatch(errorLogIn(err.errMsg.data.error));
      })
      .finally(async () => {
        dispatch(loggingIn(false));
      });
  };
export const reduxDeviceRegister =
  (device_token: string, device_type: string) =>
  (dispatch: (arg0: { type: string; payload: any }) => void) => {
    userService
      .deviceRegisterAction(device_token, device_type)
      .then(async (res: DeviceRegister) => {
        logNow('MOB==>', res);
        const message = res?.message;

        await dispatch(
          deviceReg({
            message,
          })
        );
      })
      .catch((err: LoginErrorResponse) => {
        logNow('err', err);
        dispatch(errorLogIn(err.errMsg.data.message));
      })
      .finally(async () => {
        //dispatch(loggingIn(false));
      });
  };

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut: boolean) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage: any) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    dispatch(loggingOut(true));
    await resetAuthAsyncStorage();
    await userService
      .logout()
      .then(() => {
        dispatch(loggedOut());
      })
      .catch(() => {
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
        dispatch(loggedOut());
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
        dispatch(loggedOut());
      });
  };
