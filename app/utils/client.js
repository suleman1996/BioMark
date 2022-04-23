import axios from 'axios';

const request = axios.create({
  // baseURL: 'https://bm-qa-api.biomarking.com',  prod
  baseURL: 'https://bm-dev-api.biomarking.com/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const onSuccess = function (response) {
  // console.log(response);
  return response.data;
};

const onError = function (error) {
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
  async (config) => {
    // const user = await authStorage.getToken();
    // config.headers['clientid'] = '1620112254693';
    config.headers['x-biomark-group'] = 'patient';
    config.headers['Authorization'] = 'user';

    return config;
  },
  (error) => Promise.reject(error)
);
export default request;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
