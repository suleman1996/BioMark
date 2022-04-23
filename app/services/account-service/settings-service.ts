import {logNow} from '../../utils/functions/log-binder';
import {API_URLS} from '../url-constants';
import client from '../client';
import {ErrorResponse} from '../../types/ErrorResponse';
import {ChangePasswordLoggedIn} from '../../types/auth/ChangePasswordLoggedIn';

function changePassword(current_password: string, new_password: string) {
  return new Promise<ChangePasswordLoggedIn>((resolve, reject) => {
    client
      .post(API_URLS.CHANGE_PASSWORD_LOGGED_IN, {
        password: {
          current_password,
          new_password,
        },
      })
      .then(async response => {
        try {
          logNow('Register user success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('Register user error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('Register user error response 2.', err);
        reject(err);
      });
  });
}

export const settingsService = {
  changePassword,
};
