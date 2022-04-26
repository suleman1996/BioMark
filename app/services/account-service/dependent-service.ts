import { API_URLS } from 'services/url-constants';
import { ErrorResponse } from 'types/ErrorResponse';
import client from '../client';
import { logNow } from 'utils/functions/log-binder';

function getAllDependents() {
  return new Promise<any>((resolve, reject) => {
    client
      .get(API_URLS.DEPENDENTS)
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

export const dependentService = {
  getAllDependents,
};
