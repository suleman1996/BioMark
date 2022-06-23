import client from '../client';
import { API_URLS } from '../url-constants';

import {
  ResultResponse,
  EncodedResultOverviewPayload,
  LabStatusResponse,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';

import { logNow } from 'utils/functions/log-binder';

function getLatestResult() {
  return new Promise<EncodedResultOverviewPayload>((resolve, reject) => {
    client
      .get(API_URLS.HEALTH_LATEST_RESULTS)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('latest result error', err);
        reject(err);
      });
  });
}

function getPastResult() {
  return new Promise<LabStatusResponse>((resolve, reject) => {
    client
      .get(API_URLS.HEALTH_PAST_RESULTS)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('past result error', err);
        reject(err);
      });
  });
}

const getResultOverView = (id, filter) => {
  return new Promise<ResultResponse>((resolve, reject) => {
    client
      .get(`${API_URLS.GET_RESULT_OVERVIEW}${id}${'/view?filter='}${filter}`)
      .then(async (response) => {
        try {
          //

          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get result overview error', err);
        reject(err);
      });
  });
};

const getResultPdf = (id) => {
  return client.get(`${API_URLS.GET_RESULT_PDF}${id}/download`);
};

const getMoreInfoResult = (id) => {
  return client.get(`${API_URLS.GET_RESULT_MORE_INFO}${id}/summary`);
};

const getResultOverViewChartData = (id, date, provider) => {
  return client.get(
    `${API_URLS.RESULT_OVERVIEW_CHARTDATA}${id}/chart?provider=1&date=all`,
    {
      params: {
        provider: provider,
        date: date,
      },
    }
  );
};

const getSearchResult = (lab_id, query) => {
  return client.get(`${API_URLS.GET_SEARCH_RESULT}`, {
    params: {
      lab: lab_id,
      q: query,
    },
  });
};

export const healthRecordServices = {
  getLatestResult,
  getPastResult,
  getResultOverView,
  getResultPdf,
  getMoreInfoResult,
  getResultOverViewChartData,
  getSearchResult,
};
