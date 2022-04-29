import { logNow } from 'utils/functions/log-binder';
import { ErrorResponse } from 'types/ErrorResponse';
import { ChangePasswordLoggedIn } from 'types/auth/ChangePasswordLoggedIn';
import { MarketingType } from 'types/Marketing';

import { API_URLS } from '../url-constants';
import client from '../client';
import { DisableAccountResponse } from 'types/api';

function changePassword(current_password: string, new_password: string) {
  return new Promise<ChangePasswordLoggedIn>((resolve, reject) => {
    client
      .post(API_URLS.CHANGE_PASSWORD_LOGGED_IN, {
        password: {
          current_password,
          new_password,
        },
      })
      .then(async (response) => {
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

function getMarketing() {
  return new Promise<MarketingType>((resolve, reject) => {
    client
      .get(API_URLS.MARKETING)
      .then(async (response) => {
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

function saveMarketing(enable: boolean) {
  return new Promise<MarketingType>((resolve, reject) => {
    client
      .post(API_URLS.MARKETING, {
        marketing: {
          enable,
        },
      })
      .then(async (response) => {
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

function deactivateAccount() {
  return new Promise<DisableAccountResponse>((resolve, reject) => {
    client
      .get(API_URLS.DISABLE_ACCOUNT)
      .then(async (response) => {
        try {
          logNow('Register user success response', response);
          resolve(response);
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
  getMarketing,
  saveMarketing,
  deactivateAccount,
};
