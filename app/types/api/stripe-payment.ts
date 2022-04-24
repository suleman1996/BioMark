import { ApiResponse } from './api-response';

export type StripePaymentResponse = ApiResponse<StripePayment>

export interface StripePayment {
  description: string;
  amount: number;
  paid: boolean;
  status: string | null;
}

export interface CreateStripePaymentRequest {
  payment: {
    amount: number;
    currency: string;
    description: string;
    card_token: string;
  }
}

export type StripeSessionResponse = ApiResponse<StripeSession>

export interface StripeSession {
  id: string;
  url: string;
}

export interface CreateStripeSessionRequest {
  payment: {
    success_url: string;
    cancel_url: string;
    mode: string;
    email: string;
    pay_methods: string[];
    items: PaymentItem[];
    voucher: string;
  }
}

export interface PaymentItem {
  item_name: string;
  amount: number;
  quantity: number;
  currency: string;
}