const API_URLS = {
  LOGIN: '/api/v1/auth/sessions',
  MOBILE_REGISTER: '/api/v1/patient/devices',
  SIGN_UP: '/api/v1/auth/registrations',
  SIGN_UP_ACCOUNT_CONFIRM: '/api/v1/auth/confirmations',
  RESEND_ACCOUNT_OTP: '/api/v1/auth/confirmations/resend_code',
  FORGOT_PASSWORD: '/api/v1/auth/password/forgot',
  CHANGE_PASSWORD: '/api/v1/auth/password/reset',
  RESEND_PASSWORD_OTP: '/api/v1/auth/confirmations/resend_code',
  GET_PROFILE: '/api/v1/patient/profiles',
  GET_USER_CONTACTS: '/api/v1/patient/contacts',
  LOG_OUT: '/api/v1/auth/sessions/logout',
  SAVE_USER_CONTACTS: '/api/v1/patient/contacts',
  MARKETING: '/api/v1/patient/marketing',

  // Settings
  CHANGE_PASSWORD_LOGGED_IN: '/api/v1/auth/password/reset_password',

  // EditProfile
  Smoking: '/api/v1/patient/lifestyle/smoking',
  Vaccination: '/api/v1/patient/medical_histories/vaccine',
  Allergies: '/api/v1/patient/medical_histories/allergy',
};

export { API_URLS };
