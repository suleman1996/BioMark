import { API_URLS } from 'services/url-constants';
import { CovidResultListResponse } from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';

function getCovidResults() {
  return new Promise<Array<CovidResultListResponse[]>>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_GET_RESUTLS}`)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get results error response 2.', err);
        reject(err);
      });
  });
}

export const covidService = {
  getCovidResults,
};
