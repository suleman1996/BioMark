import { API_URLS } from 'services/url-constants';
import {
  MedicalHistoryRequest,
  MedicalHistoryResponseData,
  Profile,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';

function getUserProfile() {
  return new Promise<Profile>((resolve, reject) => {
    client
      .get(`${API_URLS.GET_PROFILE}`)
      .then(async (response) => {
        try {
          logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('get all profile error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get all profile error response 2.', err);
        reject(err);
      });
  });
}

function getAllMedicalHistoryData() {
  return new Promise<MedicalHistoryResponseData>((resolve, reject) => {
    client
      .get(`${API_URLS.MEDICAL_HISTORY}`)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('all medical history error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('all medical history error response 2.', err);
        reject(err);
      });
  });
}

function saveAllMedicalHistoryPersonalData(data: MedicalHistoryRequest) {
  return new Promise<MedicalHistoryResponseData>((resolve, reject) => {
    client
      .post(`${API_URLS.MEDICAL_HISTORY}/personal`, data)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('all medical history error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('all medical history error response 2.', err);
        reject(err);
      });
  });
}

export const profileServices = {
  getUserProfile,
  getAllMedicalHistoryData,
  saveAllMedicalHistoryPersonalData,
};
