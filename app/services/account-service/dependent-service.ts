import { API_URLS } from 'services/url-constants';
import { ErrorResponse } from 'types/ErrorResponse';
import client from '../client';
import { logNow } from 'utils/functions/log-binder';
import { DependentData, DependentSaveResponse } from 'types/api/dependent';

function getAllDependents() {
  return new Promise<Array<DependentData>>((resolve, reject) => {
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

function createDependent(
  first_name: string,
  last_name: string,
  document_type: string,
  dependent_type_id: number,
  id_number: string,
  birth_date: string,
  email: string,
  phone_number: string,
  gender_id: number,
  country_code: string,
  country_phone_code: string
) {
  return new Promise<DependentSaveResponse>((resolve, reject) => {
    client
      .post(API_URLS.DEPENDENTS, {
        dependent: {
          first_name,
          last_name,
          document_type, //Either 'id_card' or 'passport'
          dependent_type_id, //From get dependent types
          id_number,
          birth_date,
          email,
          phone_number,
          gender_id, // 1 = Male, 2 = Female, 3 = Others
          country_code,
          country_phone_code,
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

export const dependentService = {
  getAllDependents,
  createDependent,
};
