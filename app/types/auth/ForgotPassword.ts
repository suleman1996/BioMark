export type ForgotPasswordSuccessResponse = {
  code_delivery_details: {
    destination: string;
    delivery_medium: string;
    attribute_name: string;
  };
};

export type ForgotPasswordErrorResponse = {
  errMsg: {
    status: number;
    data: {
      message: string;
      type: string;
      error: string;
    };
  };
};
