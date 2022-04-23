export type ErrorResponse = {
  errMsg: {
    data: {
      error: string;
      message: string;
      type: string;
    };
    status: boolean;
  };
  status: number;
};