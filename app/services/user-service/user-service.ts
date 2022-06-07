import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import {
  BootstrapData,
  GeoLocationData,
  HealthTrackerPayload,
  DashboardResponseData,
  MedicationSetupPayload,
  RiskData,
  MedicationListEntry,
  MedicationTrackerSetup,
  PspModule,
  PspModuleDataContents,
  LabStatusPayload,
  MedicalResponseData,
  ShowMedication,
  MedicationEditRequest,
  MedicationUpdateResponse,
  MedicationTracker,
  ResultResponse,
  EncodedResultOverviewPayload,
  LabStatusResponse,
  HealthTrackerPayloadData,
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

const Vaccination = ({ medical_history }: Props) => {
  return client.post(API_URLS.VACCINATION, {
    medical_history,
    // medical_history: {
    //   has_condition: condition,
    //   vaccine_list: items,
    // },
  });
};
type Props = {
  conditions: any;
  medical: any;
  lifestyle: any;
  medical_history: any;
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
  return new Promise<MedicalResponseData>((resolve, reject) => {
    client
      .get(API_URLS.GET_BODY_MEASUREMENT)
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
};
const createBloodSugar = ({ blood_sugar }: Props) => {
  return client.post(API_URLS.CREATE_BLOOD_SUGAR, {
    blood_sugar,
  });
};
const createBloodPressure = ({ medical }: Props) => {
  return client.post(API_URLS.CREATE_BLOOD_PRESSURE, {
    medical,
  });
};
const createWeight = ({ medical }: Props) => {
  return client.post(API_URLS.CREATE_WEIGHT, {
    medical,
  });
};
const createHba1c = ({ hba1c }: Props) => {
  return client.post(API_URLS.CREATE_HBA1C, {
    hba1c,
  });
};
const createMedication = ({ medication }: Props) => {
  return client.post(API_URLS.CREATE_MEDICATION, {
    medication,
  });
};
const labStatusVerify = ({ result }: Props) => {
  return client.post(API_URLS.LAB_STATUS_VERYFY, {
    result,
  });
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
        logNow('get HEALTH TRACKER error', err);
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
          console.log('rrr', response);

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
function getMedicalDropDown() {
  return new Promise<MedicationSetupPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_DROPDOWN)
      .then(async (response) => {
        try {
          console.log('med', response);

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
          console.log('memm', response);

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

function getHealthRisks() {
  return new Promise<RiskData>((resolve, reject) => {
    client
      .get(API_URLS.GET_HEALTH_RISKS)
      .then(async (response) => {
        try {
          console.log('med', response);

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
function getNewMedicationTracker() {
  return new Promise<MedicationTrackerSetup>((resolve, reject) => {
    client
      .get(API_URLS.GET_NEW_MEDICATION_TRACKER)
      .then(async (response) => {
        try {
          console.log('new med tracker', response);

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
          console.log('PSP Modules', response);
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
          console.log('Hyper Module data', response);
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
          console.log('hypertension Modules', response);
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

function getLatestResult() {
  return new Promise<EncodedResultOverviewPayload>((resolve, reject) => {
    client
      .get(API_URLS.HEALTH_LATEST_RESULTS)
      .then(async (response) => {
        try {
          console.log('LATEST RESULTS', response);
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('latest result error', err);
        reject(err);
      });
  });
}

function getPastResult() {
  return new Promise<LabStatusResponse>((resolve, reject) => {
    client
      .get(API_URLS.HEALTH_PAST_RESULTS)
      .then(async (response) => {
        try {
          console.log('PAST RESULTS', response);
          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('past result error', err);
        reject(err);
      });
  });
}
function getPspPdfLink(link) {
  console.log(link, 'linkkkkkkkkkkkkkkkkkkkkk');
  return new Promise<PspModuleDataContents>((resolve, reject) => {
    client
      .get(API_URLS.PDF_GET_LINK + link)
      .then(async (response) => {
        try {
          console.log('PSP PDF LINK', response);
          console.log('lab staus', response);

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
  console.log(link, 'linkkkkkkkkkkkkkkkkkkkkk');
  return new Promise<PspModuleDataContents>((resolve, reject) => {
    client
      .get(`${API_URLS.PDF_GET_HYPER_LINK}${link}${'?program=3'}`)
      .then(async (response) => {
        try {
          console.log('PSP PDF Hyper LINK', response);
          console.log('lab staus', response);

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
function getLabResultStatus() {
  return new Promise<LabStatusPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_LAB_STATUS)
      .then(async (response) => {
        try {
          console.log('lab staus', response);

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

const getJumioData = () => {
  return client.get(API_URLS.GET_JUMIO_DATA);
};
const deleteMedicationTracker = (id: number) => {
  console.log('iid', id);
  return client.delete(API_URLS.DELETE_MEDICATION_TRACKER + id);
};

const getNewMedicationFormData = () => {
  return new Promise<MedicationSetupPayload>((resolve, reject) => {
    client
      .get(API_URLS.GET_NEW_MEDICATION_DATA)
      .then(async ({ data }) => {
        try {
          const medication_list: any = data.medication_list.map((item) => ({
            ...item,
            value: item.id,
            label: item.name,
            disease_list: item.disease_list.map((d) => ({
              ...d,
              value: d.id,
              label: d.name,
            })),
          }));

          const frequency_list: any = data.frequency_list.map((item) => ({
            ...item,
            value: item.id,
            label: item.name,
          }));
          resolve({
            medication_list,
            frequency_list,
            unit_list: data.unit_list,
          });
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

const getSelectedMedicationData = (id: number) => {
  return new Promise<ShowMedication>((resolve, reject) => {
    client
      .get(`${API_URLS.SHOW_MEDICATION}/${id}`)
      .then(async ({ data }) => {
        try {
          resolve({
            name: data.name,
            disease_type: data.disease_type_id,
            medication_list_id: data.medication_list_id,
            unit_list_id: data.unit_list_id,
            dosage: data.dosage,
            frequency: data.frequency_id,
            frequency_time: [...data.frequency_time],
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
          });
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

const saveMedication = (medication: MedicationEditRequest) => {
  return new Promise<MedicationUpdateResponse>((resolve, reject) => {
    client
      .post(API_URLS.SAVE_MEDICATION, {
        ...medication,
      })
      .then(async ({ data }) => {
        try {
          resolve({ ...data });
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

const updateMedication = (medication: MedicationEditRequest, medication_id) => {
  return new Promise<MedicationUpdateResponse>((resolve, reject) => {
    client
      .put(`${API_URLS.SAVE_MEDICATION}/${medication_id}`, {
        ...medication,
      })
      .then(async ({ data }) => {
        try {
          resolve({ ...data });
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

const deleteMedication = (medication_id) => {
  return new Promise<MedicationUpdateResponse>((resolve, reject) => {
    client
      .delete(`${API_URLS.DELETE_MEDICATION}/${medication_id}`)
      .then(async ({ data }) => {
        try {
          console.log(data);
          resolve({ ...data });
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

const getResultOverView = (id) => {
  return new Promise<ResultResponse>((resolve, reject) => {
    client
      .get(`${API_URLS.GET_RESULT_OVERVIEW}${id}${'/view?filter=abnormal'}`)
      .then(async (response) => {
        try {
          // console.log('RESULT api overview', response);

          resolve(response.data);
        } catch (e) {
          logNow('err.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get result overview error', err);
        reject(err);
      });
  });
};

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
  getDashboard,
  getMedicalDropDown,
  createBloodSugar,
  createBloodPressure,
  createWeight,
  createHba1c,
  getHealthRisks,
  getJumioData,
  getMedicationList,
  createMedication,
  getNewMedicationTracker,
  getPspModules,
  getPspPdfLink,
  getLabResultStatus,
  labStatusVerify,
  deleteMedicationTracker,
  getNewMedicationFormData,
  getSelectedMedicationData,
  saveMedication,
  updateMedication,
  deleteMedication,
  getMedicationTrackers,
  getResultOverView,
  getLatestResult,
  getPastResult,
  getHypertensionHealthTracker,
  getPspHyperModules,
  getPspHyperPdfLink,
};
