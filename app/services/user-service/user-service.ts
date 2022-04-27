import DeviceInfo from 'react-native-device-info';

import { ErrorResponse } from 'types/ErrorResponse';
import { UserContacts } from 'types/UserContacts';
import {
  ForgotPasswordErrorResponse,
  ForgotPasswordSuccessResponse,
} from 'types/auth/ForgotPassword';
import { LoginResponse, LoginErrorResponse } from 'types/auth/LoginResponse';
import {
  RegisterUserErrorResponse,
  RegisterUserSuccessResponse,
} from 'types/auth/RegisterUser';
import { DeviceRegister } from 'types/auth/DeviceRegisterResponse';
import { logNow } from 'utils/functions/log-binder';
import {
  resetAuthAsyncStorage,
  setAuthAsyncStorage,
} from '../async-storage/auth-async-storage';
import client from '../client';
import { API_URLS } from '../url-constants';
import { store } from 'store/store';

function login(username: string, password: string) {
  return new Promise<LoginResponse>((resolve, reject) => {
    client
      .post(API_URLS.LOGIN, {
        session: {
          username,
          password,
        },
      })
      .then(async (response) => {
        try {
          await setAuthAsyncStorage(response.data);
          resolve(response.data);
        } catch (e) {
          logNow('User login service error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: LoginErrorResponse) => {
        logNow('User login service error block login.', err);
        reject(err);
      });
  });
}
function deviceRegisterAction(device_token: string, device_type: string) {
  return new Promise<DeviceRegister>((resolve, reject) => {
    client
      .post(API_URLS.MOBILE_REGISTER, {
        device: {
          device_token,
          device_type,
        },
      })
      .then(async (response) => {
        try {
          resolve(response.data);
          logNow('userService reg', response);
        } catch (e) {
          logNow('User login service error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: LoginErrorResponse) => {
        logNow('User login service error block login.', err);
        reject(err);
      });
  });
}

function forgotPassword(username: string) {
  return new Promise<ForgotPasswordSuccessResponse>((resolve, reject) => {
    client
      .post(API_URLS.FORGOT_PASSWORD, {
        password: {
          username,
        },
      })
      .then(async (response) => {
        try {
          logNow('Forgot password success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('Forgot password error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ForgotPasswordErrorResponse) => {
        logNow('Forgot password error response 2.', err);
        reject(err);
      });
  });
}

function registerUser(username: string, password: string) {
  return new Promise<RegisterUserSuccessResponse>((resolve, reject) => {
    client
      .post(API_URLS.SIGN_UP, {
        registration: {
          username,
          password,
          group: 'patient',
          terms: true,
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
      .catch(async (err: RegisterUserErrorResponse) => {
        logNow('Register user error response 2.', err);
        reject(err);
      });
  });
}

function getUserContacts() {
  return new Promise<UserContacts>((resolve, reject) => {
    client
      .get(API_URLS.GET_USER_CONTACTS)
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
        logNow('get profile error', err);
        reject(err);
      });
  });
}

function saveUserContacts(email_address: string) {
  return new Promise<UserContacts>((resolve, reject) => {
    client
      .post(API_URLS.GET_USER_CONTACTS, {
        contact: {
          email_address: email_address,
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
        logNow('get profile error', err);
        reject(err);
      });
  });
}

async function logout() {
  await resetAuthAsyncStorage();

  let uniqueId = DeviceInfo.getUniqueId();

  client
    .post(API_URLS.LOG_OUT, {
      session: {
        device_token: uniqueId,
      },
    })
    .then(async (response) => {
      try {
        logNow('response', response.data);
        store.dispatch(logout());
      } catch (e) {
        logNow('e', e);
      }
    })
    .catch(async (err: RegisterUserErrorResponse) => {
      logNow('err', err);
    });
}

const getUserProfile = () => {
  return client.get(API_URLS.GET_PROFILE);
};

const sleeping = (hours: String) => {
  return client.post(API_URLS.SLEEPING, {
    lifestyle: {
      sleep_duration: hours,
    },
  });
};

const drinking = (
  isDrinking: boolean,
  beer: Number,
  wine: Number,
  spirits: Number
) => {
  return client.post(API_URLS.Drinking, {
    lifestyle: {
      is_drinking: isDrinking,
      pints_of_beer: beer,
      glasses_of_wine: wine,
      shots_of_spirits: spirits,
    },
  });
};

const updateProfileAvatar = (pic: String) => {
  return client.post(API_URLS.Profile_Avatar, {
    profile: {
      base64: pic,
      filename: 'filename',
      filetype: 'jpg',
    },
  });
};

const updateProfile = (
  fName: String,
  lName: String,
  dob: String,
  gender: Number,
  ic_number: String,
  email: String
) => {
  return client.put(API_URLS.Update_Profile, {
    profile: {
      first_name: fName,
      last_name: lName,
      birth_date: dob,
      gender_id: gender,
      ic_number: ic_number,
      email: email,
    },
  });
};

export const userService = {
  login,
  deviceRegisterAction,
  registerUser,
  logout,
  forgotPassword,
  getUserContacts,
  saveUserContacts,
  getUserProfile,
  sleeping,
  drinking,
  updateProfileAvatar,
  updateProfile,
};
