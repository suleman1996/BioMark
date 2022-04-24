export interface RegisterRequest {
  registration: {
    username: string;
    password: string;
    group: string;
    terms: boolean;
    email_address: string;
    first_name: string;
    last_name: string;
    gender_id: string;
    birth_date: string;
    ic_number: string;
  };
}

export interface SignUpRequest {
  registration: {
    username: string;
    password: string;
    group: string;
    terms: boolean;
  };
}

export interface VerifyPhoneRequest {
  registration: {
    username: string;
  };
}

export interface VerifyPhoneResponse {
  status: boolean;
  data:{
    available: boolean;
  }
}

export interface SignUpResponse {
  user_confirmed: boolean;
  user_sub: string;
  code_delivery_details: {
    destination: string;
    delivery_medium: string;
    attribute_name: string;
  };
}

export interface SignUpResendRequest {
  username: string;
}

export interface SignUpResendResponse {
  status: boolean,
  data: {
    message: string;
  }
}

export interface SignUpConfirmRequest {
  confirmation: {
    username: string;
    password: string;
    code: string;
  };
}

export interface SignUpConfirmResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  message: string;
  first_login: boolean;
  has_profile: boolean;
  confirmed: false;
}
