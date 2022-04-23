export type RegisterUserSuccessResponse = {
  user_confirmed: boolean;
  code_delivery_details: {
    destination: string;
    delivery_medium: string;
    attribute_name: string;
  };
  user_sub: string;
};

export type RegisterUserErrorResponse = {
  errMsg: {
    status: boolean;
    data: {
      message: string;
      type: string;
      error: string;
    };
  };
};
