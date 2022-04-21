const API_URLS =  {
  LOGIN: '/api/v1/auth/sessions',
  SIGN_UP: '/api/v1/auth/registrations',
  SIGN_UP_ACCOUNT_CONFIRM: '/api/v1/auth/confirmations',
  RESEND_ACCOUNT_OTP: '/api/v1/auth/confirmations/resend_code',
  FORGOT_PASSWORD: '/api/v1/auth/password/forgot',
  CHANGE_PASSWORD: '/api/v1/auth/password/reset',
  RESEND_PASSWORD_OTP: '/api/v1/auth/confirmations/resend_code',
};


export {API_URLS}