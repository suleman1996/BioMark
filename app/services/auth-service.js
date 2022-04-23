import client from '../utils/client';
import URL from '../utils/url-path';

export const login = async obj => {
  return client.post(URL.LOGIN, obj);
};

export const signup = async obj => {
  return client.post(URL.SIGN_UP, obj);
};
export const signupAccountConfirm = async obj => {
  return client.post(URL.SIGN_UP_ACCOUNT_CONFIRM, obj);
};

export const resendAccountCode = async obj => {
  return client.post(URL.RESEND_ACCOUNT_OTP, obj);
};

export const forgotPassword = async obj => {
  return client.post(URL.FORGOT_PASSWORD, obj);
};

export const changePassword = async obj => {
  return client.post(URL.CHANGE_PASSWORD, obj);
};

export const resendOTP = async obj => {
  return client.post(URL.RESEND_PASSWORD_OTP, obj);
};

export const inputBarcode = async obj => {
  return client.post(URL.INPUT_BARCODE, obj);
};
