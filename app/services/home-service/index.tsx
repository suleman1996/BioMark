import client from '../client';
import { API_URLS } from '../url-constants';

import {
  BootstrapData,
  HealthTrackerPayload,
  DashboardResponseData,
  MedicationSetupPayload,
  HealthFeed,
  RiskData,
  MedicationListEntry,
  LabStatusPayload,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';

import { logNow } from 'utils/functions/log-binder';

const getUserProfile = () => {
  return client.get(API_URLS.GET_PROFILE);
};

function getBootstrap() {
  return new Promise<BootstrapData>((resolve, reject) => {
    client
      .get(API_URLS.BOOTSTRAP)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('Register user error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get profile error', err);
        reject(err);
      });
  });
}

function getMedicalDropDown() {
  return new Promise<MedicationSetupPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_DROPDOWN)
      .then(async (response) => {
        try {
          resolve(response.data);
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
}

function getMedicationList() {
  return new Promise<MedicationListEntry>((resolve, reject) => {
    client
      .get(API_URLS.GET_MEDICATION_DROPDWON)
      .then(async (response) => {
        try {
          resolve(response.data);
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
}
function getDashboard() {
  return new Promise<DashboardResponseData>((resolve, reject) => {
    client
      .get(API_URLS.DASHBOARD)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get DASHBOARD error', err);
        reject(err);
      });
  });
}

function getHealthTracker() {
  return new Promise<HealthTrackerPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_TRACKER)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get HEALTH TRACKER error', err);
        reject(err);
      });
  });
}

function getHealthRisks() {
  return new Promise<RiskData>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_RISKS)
      .then(async (response) => {
        try {
          resolve(response.data);
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
}

function getLabResultStatus() {
  return new Promise<LabStatusPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_LAB_STATUS)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('pdf error', err);
        logNow('lab status error', err);
        reject(err);
      });
  });
}

function getHealthFeeds() {
  return new Promise<HealthFeed>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_FEEDS)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get health feed error', err);
        reject(err);
      });
  });
}

export const homeServices = {
  getUserProfile,
  getBootstrap,
  getMedicalDropDown,
  getMedicationList,
  getDashboard,
  getHealthTracker,
  getHealthRisks,
  getLabResultStatus,
  getHealthFeeds,
};
