import client from 'utils/client';
import { API_URLS as URL } from './url-constants';
import {
  LoginRequest,
  RegisterRequest,
  SignUpConfirmRequest,
  SignUpResendRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  QrCodeRequest,
} from 'types/api';

export const login = async (obj: LoginRequest) => {
  return client.post(URL.LOGIN, obj);
};

export const signup = async (obj: RegisterRequest) => {
  return client.post(URL.SIGN_UP, obj);
};
export const signupAccountConfirm = async (obj: SignUpConfirmRequest) => {
  return client.post(URL.SIGN_UP_ACCOUNT_CONFIRM, obj);
};

export const resendAccountCode = async (obj: SignUpResendRequest) => {
  return client.post(URL.RESEND_ACCOUNT_OTP, obj);
};

export const forgotPassword = async (obj: ForgotPasswordRequest) => {
  return client.post(URL.FORGOT_PASSWORD, obj);
};

export const changePassword = async (obj: ResetPasswordRequest) => {
  return client.post(URL.CHANGE_PASSWORD, obj);
};

export const resendOTP = async (obj: SignUpResendRequest) => {
  return client.post(URL.RESEND_PASSWORD_OTP, obj);
};

export const inputBarcode = async (obj: QrCodeRequest) => {
  return client.post(URL.INPUT_BARCODE, obj);
};
