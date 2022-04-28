const API_URLS = {
  LOGIN: '/api/v1/auth/sessions',
  FEDERATED_LOGIN: '/api/v1/auth/federated_identity',
  MOBILE_REGISTER: '/api/v1/patient/devices',
  SIGN_UP: '/api/v2/auth/registrations',
  SIGN_UP_ACCOUNT_CONFIRM: '/api/v1/auth/confirmations',
  RESEND_ACCOUNT_OTP: '/api/v1/auth/confirmations/resend_code',
  FORGOT_PASSWORD: '/api/v1/auth/password/forgot',
  CHANGE_PASSWORD: '/api/v1/auth/password/reset',
  RESEND_PASSWORD_OTP: '/api/v1/auth/confirmations/resend_code',
  GET_PROFILE: '/api/v1/patient/profiles',
  CREATE_PROFILE: 'api/v2/patient/profiles',
  GET_USER_CONTACTS: '/api/v1/patient/contacts',
  LOG_OUT: '/api/v1/auth/sessions/logout',
  AUTO_LOG_OUT: '/api/v1/patient/settings',
  SAVE_USER_CONTACTS: '/api/v1/patient/contacts',
  MARKETING: '/api/v1/patient/marketing',
  SLEEPING: '/api/v1/patient/lifestyle/sleeping',
  Drinking: '/api/v1/patient/lifestyle/drinking',
  Profile_Avatar: '/api/v1/patient/profiles/avatar',
  Update_Profile: '/api/v1/patient/profiles/update',
  DISABLE_ACCOUNT: '/api/v1/auth/accounts/disable',

  // Dependent
  DEPENDENTS: '/api/v1/patient/dependents',

  // Settings
  CHANGE_PASSWORD_LOGGED_IN: '/api/v1/auth/password/reset_password',

  // EditProfile
  Smoking: '/api/v1/patient/lifestyle/smoking',
  Vaccination: '/api/v1/patient/medical_histories/vaccine',
  Allergies: '/api/v1/patient/medical_histories/allergy',
};

export { API_URLS };
