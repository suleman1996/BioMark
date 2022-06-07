const API_URLS = {
  //Auth constants
  LOGIN: '/api/v1/auth/sessions',
  FEDERATED_LOGIN: '/api/v1/auth/federated_identity',
  SIGN_UP: '/api/v2/auth/registrations',
  SIGN_UP_ACCOUNT_CONFIRM: '/api/v1/auth/confirmations',
  RESEND_ACCOUNT_OTP: '/api/v1/auth/confirmations/resend_code',
  FORGOT_PASSWORD: '/api/v1/auth/password/forgot',
  CHANGE_PASSWORD: '/api/v1/auth/password/reset',
  RESEND_PASSWORD_OTP: '/api/v1/auth/confirmations/resend_code',
  INPUT_BARCODE: '/api/v1/patient/scanners/midas',
  MOBILE_REGISTER: '/api/v1/patient/devices',
  BOOTSTRAP: '/api/v1/patient/bootstrapper',
  NOTIFICATIONS: '/api/v1/patient/notifications',

  GET_PROFILE: '/api/v1/patient/profiles',
  CREATE_PROFILE: 'api/v2/patient/profiles',
  GET_USER_CONTACTS: '/api/v1/patient/contacts',
  LOG_OUT: '/api/v1/auth/sessions/logout',
  AUTO_LOG_OUT: '/api/v1/patient/settings',
  SAVE_AUTO_LOG_OUT: '/api/v1/patient/settings/update',
  SAVE_USER_CONTACTS: '/api/v1/patient/contacts',
  MARKETING: '/api/v1/patient/marketing',
  PROFILE_AVATAR: '/api/v1/patient/profiles/avatar',
  UPDATE_PROFILE: '/api/v1/patient/profiles/update',
  DISABLE_ACCOUNT: '/api/v1/auth/accounts/disable',
  MEDICAL_HISTORY: '/api/v1/patient/medical_histories',
  GET_FAMILY_MEDICAL_HISTORY: '/api/v1/patient/medical_histories',
  CREATE_FAMILY_MEDICAL_HISTORY: '/api/v1/patient/medical_histories/family',

  // Dependent
  DEPENDENTS: '/api/v1/patient/dependents',

  // Settings
  CHANGE_PASSWORD_LOGGED_IN: '/api/v1/auth/password/reset_password',

  // EditProfile
  SMOKING: '/api/v1/patient/lifestyle/smoking',
  SLEEPING: '/api/v1/patient/lifestyle/sleeping',
  DRINKING: '/api/v1/patient/lifestyle/drinking',
  VACCINATION: '/api/v1/patient/medical_histories/vaccine',
  ALLERGIES: '/api/v1/patient/medical_histories/allergy',
  GET_STRESS: '/api/v1/patient/stress',
  CREATE_STRESS: '/api/v1/patient/stress',
  GET_LIFE_STYLE: '/api/v1/patient/lifestyle',
  GET_MEDICAL_HISTORY: '/api/v1/patient/medical_histories',
  BODY_MEASUREMENT: '/api/v1/patient/medical/bm',
  GET_BODY_MEASUREMENT: '/api/v1/patient/medical',
  GET_HEALTH_TRACKER: '/api/v1/patient/health_trackers',

  LOCATION: '/api/v1/geolocation',
  EXERCISE: '/api/v1/patient/lifestyle/exercise',

  DASHBOARD: 'api/v1/patient/dashboard',
  GET_JUMIO_DATA: '/integration/v1/id_verifications/get_authtoken',

  // Health Traqcker
  GET_HEALTH_DROPDOWN: '/api/v1/patient/psp/trackers/blood_sugar/new',
  CREATE_BLOOD_SUGAR: '/api/v1/patient/psp/trackers/blood_sugar',
  CREATE_BLOOD_PRESSURE: '/api/v1/patient/bp_trackers',
  CREATE_WEIGHT: '/api/v1/patient/weight_trackers',
  CREATE_HBA1C: '/api/v1/patient/psp/trackers/hba1c',
  GET_HEALTH_RISKS: '/api/v1/patient/risks',

  // Health Record

  GET_RESULT_OVERVIEW: '/api/v1/patient/results/',

  // Covid
  COVID_GET_RESUTLS: '/api/v2/patient/results/covid',
  COVID_GET_RESUTLS_DOWNLOAD_V1: '/api/v1/patient/results/',
  GET_MEDICATION_DROPDWON: 'api/v1/patient/psp/medications',
  CREATE_MEDICATION: '/api/v1/patient/psp/trackers/medication',
  GET_NEW_MEDICATION_TRACKER: '/api/v1/patient/psp/trackers/medication/new',
  DELETE_MEDICATION_TRACKER: '/api/v1/patient/psp/trackers/medication/',
  // Psp Modules
  PSP_GET_MODULES: '/api/v1/patient/psp/modules',
  PDF_GET_LINK: '/api/v1/patient/psp/modules/',
  PDF_GET_HYPER_LINK:
    'https://bm-dev-api.biomarking.com/api/v1/patient/psp/modules/',
  PSP_GET_HYPERTENSION_MODULES:
    '/api/v1/patient/health_trackers?page=hypertension',
  PSP_GET_HYPER_MODULE_DATA: '/api/v1/patient/psp/modules?program=3',
  GET_LAB_STATUS: '/api/v1/patient/results/lab_status',

  LAB_STATUS_VERYFY: '/api/v1/patient/results/verify',

  // Health Records
  HEALTH_LATEST_RESULTS: '/api/v1/patient/results/latest',
  HEALTH_PAST_RESULTS: '/api/v1/patient/results/past',

  // Medication
  GET_NEW_MEDICATION_DATA: '/api/v1/patient/psp/medications/new',
  GET_MEDICATION_TRACKER: '/api/v1/patient/psp/trackers/medication',
  SHOW_MEDICATION: '/api/v1/patient/psp/medications',
  SAVE_MEDICATION: '/api/v1/patient/psp/medications',
  UPDATE_MEDICATION: '/api/v1/patient/psp/medications',
  DELETE_MEDICATION: '/api/v1/patient/psp/medications',
};

export { API_URLS };
