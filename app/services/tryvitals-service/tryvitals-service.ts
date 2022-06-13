import {
  LinkTokenErrorResponse,
  LinkTokenResponse,
} from 'types/auth/TryvitalsResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';
import { API_URLS } from '../url-constants';

function linkToken() {
  return new Promise<LinkTokenResponse>((resolve, reject) => {
    client
      .get(API_URLS.TRYVITALS_LINK_TOKEN)
      .then(async (response) => {
        resolve(response.data);
      })
      .catch(async (err: LinkTokenErrorResponse) => {
        logNow('Tryvitals link token generation not working', err);
        reject(err);
      });
  });
}

export const TryvitalsService = {
  linkToken,
};
