import { ApiResponse } from './api-response';

export type OrderPaymentResponse = ApiResponse<OrderPayment>;

export interface OrderPayment {
  id: string;
  link: string;
}

export interface OrderPaymentRequest {
  order: {
    amount: string;
  };
}
