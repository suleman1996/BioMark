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
  // Health Traqcker
  GET_HEALTH_DROPDOWN: '/api/v1/patient/psp/trackers/blood_sugar/new',
  CREATE_BLOOD_SUGAR: '/api/v1/patient/psp/trackers/blood_sugar',
  CREATE_BLOOD_PRESSURE: '/api/v1/patient/bp_trackers',
  CREATE_WEIGHT: '/api/v1/patient/weight_trackers',
  CREATE_HBA1C: '/api/v1/patient/psp/trackers/hba1c',
  GET_HEALTH_RISKS: '/api/v1/patient/risks',
};

export { API_URLS };
