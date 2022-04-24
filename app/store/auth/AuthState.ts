export class AuthState {
  errorMessageLogin = '';
  errorMessageLogout = '';
  loggingIn = false;
  loggingOut = false;
  userToken = null;
  refreshToken = null;
  isFirstLogin = false;
  hasProfile = false;
  expiresIin = 300000;
  message = null;
  userContacts = {
    mobile: '',
    email_address: '',
  };
  marketing = {
    enable: false,
  };
}
