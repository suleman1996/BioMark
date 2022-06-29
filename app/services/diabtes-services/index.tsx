import {
  NewTarget,
  CreateTargetResponse,
  CreateTargetRequest,
  LatestTargetResponse,
} from 'types/api';

import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';
import { API_URLS } from '../url-constants';

const getNewTarget = () => {
  return new Promise<NewTarget>((resolve, reject) =>
    client
      .get(API_URLS.GET_NEW_TARGET)
      .then(({ data }: { data: NewTarget }) => {
        resolve(data);
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get med error', err);
        reject(err);
      })
  );
};

const createNewTarget = (target: CreateTargetRequest) => {
  return new Promise<string>((resolve, reject) =>
    client
      .post(API_URLS.CREATE_NEW_TARGET, { target })
      .then(({ data }: { data: CreateTargetResponse }) => {
        resolve(data.message);
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get med error', err);
        reject('');
      })
  );
};

const getLatestTargets = () => {
  return new Promise<LatestTargetResponse>((resolve, reject) =>
    client
      .get(API_URLS.GET_LATEST_TARGETS)
      .then(({ data }: { data: LatestTargetResponse }) => {
        resolve(data);
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get med error', err);
        reject('');
      })
  );
};

export const diabtesServices = {
  getNewTarget,
  createNewTarget,
  getLatestTargets,
};
