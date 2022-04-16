export class AuthState {
  errorMessageLogin = null;
  errorMessageLogout = null;
  loggingIn= false;
  loggingOut= false;
  token = null;
  user = {
    name: '', 
    email: '', 
    phoneNumber: '', 
    profilePic: '', 
    _id: '',
    sas: '',
    userId: ''
  };
}
