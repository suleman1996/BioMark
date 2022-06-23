import client from '../client';
import { API_URLS } from '../url-constants';

import {
  MedicationTracker,
  WeightProgressLogsPayload,
  BloodSugarProgressLogsPayload,
  Hba1CProgressLogsPayload,
  BloodPressureProgressLogsPayload,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';

import { logNow } from 'utils/functions/log-binder';

const getBloodPressureLogs = (params?: { type: string } | undefined) => {
  return new Promise<BloodPressureProgressLogsPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_BLOOD_PRESSURE_LOGS, { params })
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get weight log error', err);
        reject(err);
      });
  });
};

const getBloodSugarLogs = (
  params: { meal?: string; unit?: number } | undefined
) => {
  return new Promise<BloodSugarProgressLogsPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_BLOOD_SUGAR_LOGS, {
        params,
      })
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
        logNow('get bs log error', err);
        reject(err);
      });
  });
};

const getHba1cLogs = () => {
  return new Promise<Hba1CProgressLogsPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_HBA1C_LOGS)
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
        logNow('get hb1c log error', err);
        reject(err);
      });
  });
};

const getWeightLogs = (
  params: { type: string; metric: boolean } | undefined
) => {
  return new Promise<WeightProgressLogsPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_WEIGHT_LOGS, { params })
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get weight log error', err);
        reject(err);
      });
  });
};

const getBloodPressureMapData = (obj) => {
  return client.get(API_URLS.GET_BLOOD_PRESSURE_MAP, {
    params: obj,
  });
};

const getBloodSugarMapData = (obj) => {
  return client.get(API_URLS.GET_BLOOD_SUGAR_CHART, {
    params: obj,
  });
};

const getHbA1cMapData = (obj) => {
  return client.get(API_URLS.GET_HBA1C_MAP, {
    params: obj,
  });
};

const getMedicationTrackers = (date: string) => {
  return new Promise<MedicationTracker>((resolve, reject) => {
    client
      .get(API_URLS.GET_MEDICATION_TRACKER)
      .then(async ({ data }) => {
        try {
          let response;
          data.map((item) => {
            if (moment(item.date).format('MMM D, YYYY') === date) {
              response = { ...item };
            }
          });
          resolve({ ...response });
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get med error', err);
        reject(err);
      });
  });
};

const getWeightMapData = (obj) => {
  return client.get(API_URLS.GET_WEIGHT_MAP, {
    params: obj,
  });
};

export const healthProgressServices = {
  getBloodPressureLogs,
  getBloodPressureMapData,
  getBloodSugarMapData,
  getBloodSugarLogs,
  getHbA1cMapData,
  getHba1cLogs,
  getMedicationTrackers,
  getWeightMapData,
  getWeightLogs,
};
