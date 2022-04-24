import { ApiResponse } from './api-response';

export type BillplzPaymentResponse = ApiResponse<BillplzPayment>

export interface BillplzPayment {
  url: string;
  id: string;
}

export interface CreateBillplzPaymentRequest {
  payment: {
    amount: number;
    name: string;
    description: string;
    email: string;
    callback: string;
    redirect: string;
  }
}