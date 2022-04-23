import axios from 'axios';
import React from 'react';
import {logNow} from '../utils/functions/log-binder';
import {getAuthAsyncStorage} from './async-storage/auth-async-storage';

const request = axios.create({
  // baseURL: 'https://bm-qa-api.biomarking.com',  prod
  baseURL: 'https://bm-dev-api.biomarking.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const onSuccess = function (response: any) {
  // console.log(response);
  return response.data;
};

const onError = function (error: any) {
  //   console.error('Request Failed:', error.config);
  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    // console.error('Status:', error.response.status);
    // console.error('Data:', error.response.data);
    // console.error('Headers:', error.response.headers);
  }
  return Promise.reject({
    errMsg: !error?.response ? 'Network Issue!' : error?.response?.data,
    status: error?.response?.status || 'not status',
  });

  //   return Promise.reject({
  //     errMsg: !error?.response
  //       ? 'Network Issue!'
  //       : error?.response?.data?.message ||
  //         capitalizeFirstLetter(error?.response?.data?.errors[0].param) +
  //           ' ' +
  //           error?.response?.data?.errors[0].msg.toLowerCase(),
  //     status: error?.response?.status || 'not status',
  //   });
};

request.interceptors.response.use(onSuccess, onError);

request.interceptors.request.use(
  async config => {
    // const user = await authStorage.getToken();
    const {userToken} = await getAuthAsyncStorage();
    // logNow('its userToken', userToken);
    // config.headers['clientid'] = '1620112254693';
    config.headers['x-biomark-group'] = 'patient';
    config.headers['x-biomark-token'] = `${userToken}`;
    config.headers['Authorization'] = 'user';

    return config;
  },
  error => Promise.reject(error),
);
export default request;
