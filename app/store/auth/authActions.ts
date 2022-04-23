import {
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { userService } from '../../services/user-service/userService';
import {
  LoginErrorResponse,
  LoginResponse,
} from '../../types/auth/LoginResponse';
import {
  DeviceRegister
} from '../../types/auth/DeviceRegisterResponse';
import { logNow } from '../../utils/functions/logBinder';
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  AUTH_USER,
  DEVICE_REG
} from './constants';

export const loggingIn = (loggingIn: boolean) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn,
});

export const loggedIn = (data: any) => ({
  type: AUTH_LOGGED_IN,
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

export const reduxLogin =
  (username: string, password: string) =>
  (dispatch: (arg0: {type: string; payload: any}) => void) => {
    dispatch(loggingIn(true));
    userService
      .login(username, password)
      .then(async (res: LoginResponse) => {
        logNow('auth reducer ==>',res);
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
          }),
        );
        let uniqueId = DeviceInfo.getUniqueId();
        console.log("uniqueId",uniqueId);
        await dispatch(reduxDeviceRegister(uniqueId, Platform.OS)); 
        
        // await navigate('DashboardScreen');
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
        .deviceRegisteration(device_token, device_type)
        .then(async (res: DeviceRegister) => {
          logNow('MOB==>', res);
            const message = res?.message;
         
          await dispatch(
            deviceReg({
              message
            }),
          );
          // await navigate('DashboardScreen');
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
    await userService
      .logout()
      .then(res => {
        dispatch(loggedOut());
      })
      .catch(err => {
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
