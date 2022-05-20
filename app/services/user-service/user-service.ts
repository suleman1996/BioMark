import DeviceInfo from 'react-native-device-info';
import {
  BootstrapData,
  GeoLocationData,
  HealthTrackerPayload,
} from 'types/api';
import { AutoLogoutRes } from 'types/auth/AutoLogoutRes';
import { DeviceRegister } from 'types/auth/DeviceRegisterResponse';
import {
  ForgotPasswordErrorResponse,
  ForgotPasswordSuccessResponse,
} from 'types/auth/ForgotPassword';
import { LoginErrorResponse, LoginResponse } from 'types/auth/LoginResponse';
import {
  RegisterUserErrorResponse,
  RegisterUserSuccessResponse,
} from 'types/auth/RegisterUser';
import { ErrorResponse } from 'types/ErrorResponse';
import { UserContacts } from 'types/UserContacts';
import { logNow } from 'utils/functions/log-binder';
import { setAuthAsyncStorage } from '../async-storage/auth-async-storage';
import client from '../client';
import { API_URLS } from '../url-constants';

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
function federatedlogin(access_token: string, provider: string) {
  return new Promise<LoginResponse>((resolve, reject) => {
    client
      .post(API_URLS.FEDERATED_LOGIN, {
        federated_identity: {
          access_token,
          provider,
        },
      })
      .then(async (response) => {
        try {
          // await resetAuthAsyncStorage();
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

function registerUser(username: string, values, gender: any, date: string) {
  return new Promise<RegisterUserSuccessResponse>((resolve, reject) => {
    client
      .post(API_URLS.SIGN_UP, {
        registration: {
          password: values.password,
          terms: true,
          email_address: values.email,
          first_name: values.fName,
          last_name: values.lName,
          gender_id: gender,
          birth_date: date,
          ic_number: values.IcPnum,
          username: username,
          group: 'patient',
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
function createProfile(values, gender: any, date: string) {
  console.log('values', values);
  console.log('gender', gender);
  console.log('date', date);
  return new Promise<RegisterUserSuccessResponse>((resolve, reject) => {
    client
      .post(API_URLS.CREATE_PROFILE, {
        profile: {
          first_name: values.fName,
          last_name: values.lName,
          ic_number: values.IcPnum,
          gender_id: gender,
          birth_date: date,
          email_address: values.email,
          terms: true,
        },
      })
      .then(async (response) => {
        try {
          logNow('create user success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('create user error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: RegisterUserErrorResponse) => {
        logNow('create user error response 2.', err);
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
function autoLogout() {
  return new Promise<AutoLogoutRes>((resolve, reject) => {
    client
      .get(API_URLS.AUTO_LOG_OUT)
      .then(async (response) => {
        try {
          logNow('tes', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('e', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('err', err);
        reject(err);
      });
  });
}
function saveAutoLogout(auto_logout: boolean) {
  return new Promise<AutoLogoutRes>((resolve, reject) => {
    console.log('auto_logout', auto_logout);

    client
      .post(API_URLS.SAVE_AUTO_LOG_OUT, {
        settings: {
          auto_logout: auto_logout,
        },
      })
      .then(async (response) => {
        try {
          logNow('tes', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('e', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('err', err);
        reject(err);
      });
  });
}
async function logout() {
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
        // await resetAuthAsyncStorage();
        // await store.dispatch(logout());
      } catch (e) {
        logNow('e', e);
      }
    })
    .catch(async (err: RegisterUserErrorResponse) => {
      logNow('err', err);
    });
}

const Smoking = (
  day: Number,
  stopSmoke: Number,
  startSmoke: Number,
  isSmoking: string
) => {
  return client.post(API_URLS.SMOKING, {
    lifestyle: {
      is_smoking: isSmoking,
      stick_per_day: day,
      smoking_stop_at: stopSmoke,
      smoking_start_at: startSmoke,
    },
  });
};

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
  return client.post(API_URLS.DRINKING, {
    lifestyle: {
      is_drinking: isDrinking,
      pints_of_beer: beer,
      glasses_of_wine: wine,
      shots_of_spirits: spirits,
    },
  });
};

const Vaccination = (items: string | number, condition: any) => {
  return client.post(API_URLS.VACCINATION, {
    medical_history: {
      has_condition: condition,
      vaccine_list: items,
    },
  });
};
type Props = {
  conditions: any;
  medical: any;
  lifestyle: any;
  has_allergy: any;
};
const Allergies = ({ conditions, has_allergy }: Props) => {
  return client.post(API_URLS.ALLERGIES, {
    medical_history: {
      has_allergy,
      conditions,
      // conditions: [
      //   {
      //     has_condition: true,
      //     allergy_to: isMedicationModal,
      //     allergy_type: 'item1,item2,item3,item4',
      //   },
      // ],
    },
  });
};

const bodyMeasurement = ({ medical }: Props) => {
  return client.post(API_URLS.BODY_MEASUREMENT, {
    medical,
  });
};

const exercise = ({ lifestyle }: Props) => {
  return client.post(API_URLS.EXERCISE, {
    lifestyle,
  });
};

const updateProfileAvatar = (pic: String) => {
  return client.post(API_URLS.PROFILE_AVATAR, {
    profile: {
      base64: pic,
      filename: 'filename',
      filetype: 'jpg',
    },
  });
};

const getFamilyMedicalHistory = () => {
  return client.get(API_URLS.GET_FAMILY_MEDICAL_HISTORY);
};

const createFamilyMedicalHistory = (history: Array<String>) => {
  return client.post(API_URLS.CREATE_FAMILY_MEDICAL_HISTORY, {
    medical_history: {
      conditions: history,
    },
  });
};

const getStress = () => {
  return client.get(API_URLS.GET_STRESS);
};

const getLifeStyle = () => {
  return client.get(API_URLS.GET_LIFE_STYLE);
};

const getMedicalHistory = () => {
  return client.get(API_URLS.GET_MEDICAL_HISTORY);
};

const getBodyMeasurements = () => {
  return client.get(API_URLS.GET_BODY_MEASUREMENT);
};

const createStress = (q1: Number, q2: Number, q3: Number, q4: Number) => {
  return client.post(API_URLS.CREATE_STRESS, {
    stress: {
      question1: q1,
      question2: q2,
      question3: q3,
      question4: q4,
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
  return client.put(API_URLS.UPDATE_PROFILE, {
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
function geoLocation() {
  return new Promise<GeoLocationData>((resolve, reject) => {
    client
      .get(API_URLS.LOCATION)
      .then(async (response) => {
        try {
          console.log('rees', response);

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

function updateUserEthnic(ethnic: string) {
  return new Promise((resolve, reject) => {
    client
      .put(API_URLS.UPDATE_PROFILE, {
        profile: {
          ethnic,
        },
      })
      .then(async (response) => {
        try {
          console.log('updateUserEthnic response', response.data);

          resolve(response.data);
        } catch (e) {
          logNow('updateUserEthnic user error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('updateUserEthnic updateUserEthnic error', err);
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
          console.log('rrr', response);

          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get profile error', err);
        reject(err);
      });
  });
}

export const userService = {
  login,
  federatedlogin,
  deviceRegisterAction,
  registerUser,
  autoLogout,
  saveAutoLogout,
  logout,
  forgotPassword,
  getUserContacts,
  saveUserContacts,
  Smoking,
  Vaccination,
  Allergies,
  bodyMeasurement,
  createProfile,
  getUserProfile,
  sleeping,
  drinking,
  updateProfileAvatar,
  updateProfile,
  getFamilyMedicalHistory,
  createFamilyMedicalHistory,
  getStress,
  createStress,
  getLifeStyle,
  getMedicalHistory,
  getBootstrap,
  geoLocation,
  exercise,
  updateUserEthnic,
  getBodyMeasurements,
  getHealthTracker,
};
