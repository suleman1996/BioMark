import { ForgotPasswordErrorResponse, ForgotPasswordSuccessResponse } from '../../types/auth/ForgotPassword';
import { LoginResponse, LoginErrorResponse } from '../../types/auth/LoginResponse';
import { logNow } from '../../utils/functions/logBinder';
import {
  resetAuthAsyncStorage,
  setAuthAsyncStorage,
  setAuthUserAsyncStorage,
} from '../async-storage/auth-async-storage';
import client from '../client'
import {API_URLS} from '../url-constants'


function login(username: string, password: string) {
 return new Promise<LoginResponse>((resolve, reject) => {
   client
     .post(API_URLS.LOGIN, {
       session: {
         username,
         password,
       },
     })
     .then(async (response) => {
       try {
        //  logNow('userService login',response.data)
         await setAuthAsyncStorage(response.data);
         resolve(response.data);
       } catch (e) {
         logNow('User login service error block login1.', e);
         reject(e);
       }
     })
     .catch(async (err : LoginErrorResponse) => {
       logNow('User login service error block login.', err);
       reject(err);
     });
 });
}


function forgotPassword(username: string) {
  return new Promise<ForgotPasswordSuccessResponse>((resolve, reject) => {
    client
      .post(API_URLS.FORGOT_PASSWORD, {
        password: {
          username,
        },
      })
      .then(async response => {
        try {
           logNow('Forgot password success response',response.data)
          resolve(response.data);
        } catch (e) {
          logNow('Forgot password error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ForgotPasswordErrorResponse) => {
        logNow('Forgot password error response 2.', err);
        reject(err);
      });
  });
}


async function logout() {
  await resetAuthAsyncStorage();
}

export const userService = {
  login,
  logout,
  forgotPassword,
};