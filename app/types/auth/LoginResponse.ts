export type LoginResponse = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    message: string;
    first_login: boolean;
    has_profile: boolean;
};

export type LoginErrorResponse = {
  errMsg: {
    status: boolean;
    data: {
      message: string;
      type: string;
      error: string;
    };
  };
};
