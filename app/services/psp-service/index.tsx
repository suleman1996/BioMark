import {
  MedicationTrackerSetup,
  PspModule,
  PspModuleDataContents,
  HealthTrackerPayloadData,
  LabUploadPayload,
} from 'types/api';

import { ErrorResponse } from 'types/ErrorResponse';

import { logNow } from 'utils/functions/log-binder';
import client from '../client';
import { API_URLS } from '../url-constants';

function getNewMedicationTracker() {
  return new Promise<MedicationTrackerSetup>((resolve, reject) => {
    client
      .get(API_URLS.GET_NEW_MEDICATION_TRACKER)
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

function getPspModules() {
  return new Promise<PspModule>((resolve, reject) => {
    client
      .get(API_URLS.PSP_GET_MODULES)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('psp error', err);
        reject(err);
      });
  });
}

function getPspHyperModules() {
  return new Promise<PspModule>((resolve, reject) => {
    client
      .get(API_URLS.PSP_GET_HYPER_MODULE_DATA)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('psp hyper error', err);
        reject(err);
      });
  });
}

function getHypertensionHealthTracker() {
  return new Promise<HealthTrackerPayloadData>((resolve, reject) => {
    client
      .get(API_URLS.PSP_GET_HYPERTENSION_MODULES)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('hypertension error', err);
        reject(err);
      });
  });
}

function getLabUploadResult(id) {
  return new Promise<LabUploadPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_LAB_UPLOADS + id)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get upload result error', err);
        reject(err);
      });
  });
}

const deleteLabUploads = (id: number) => {
  return client.delete(API_URLS.DELETE_LAB_UPLOADS + id);
};

function getPspPdfLink(link) {
  return new Promise<PspModuleDataContents>((resolve, reject) => {
    client
      .get(API_URLS.PDF_GET_LINK + link)
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

function getPspHyperPdfLink(link) {
  return new Promise<PspModuleDataContents>((resolve, reject) => {
    client
      .get(`${API_URLS.PDF_GET_HYPER_LINK}${link}${'?program=3'}`)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('pdf Hyper error', err);
        logNow('lab status error', err);
        reject(err);
      });
  });
}

export const userService = {
  getNewMedicationTracker,
  getPspModules,
  getPspPdfLink,

  getHypertensionHealthTracker,
  getPspHyperModules,
  getPspHyperPdfLink,

  getLabUploadResult,
  deleteLabUploads,
};
