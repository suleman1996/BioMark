import { HttpErrorResponse } from '@angular/common/http';

export interface ApiErrorResponse {
  status: string;
  code: number;
  message: string;
  data: {
    message: string;
    type: string;
    error: string;
  };
}

export interface HttpApiErrorResponse extends HttpErrorResponse {
  error: ApiErrorResponse;
}
