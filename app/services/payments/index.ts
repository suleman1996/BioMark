import { API_URLS } from 'services/url-constants';
import {
  BillplzPayment,
  CreateBillplzPaymentRequest,
  CreateStripeSessionRequest,
  StripeSession,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';

function purchaseViaBillPlz(data: CreateBillplzPaymentRequest) {
  return new Promise<BillplzPayment>((resolve, reject) => {
    client
      .post(`${API_URLS.BILLPLZ}`, data)
      .then(async (response: any) => {
        try {
          logNow('billplz', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('billplz catch error', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('bill plz error.', err);
        reject(err);
      });
  });
}

function purchaseViaStripe(data: CreateStripeSessionRequest) {
  return new Promise<StripeSession>((resolve, reject) => {
    client
      .post(`${API_URLS.STRIPE}`, data)
      .then(async (response: any) => {
        try {
          logNow('STRIPE', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('STRIPE catch error', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('STRIPE  error.', err);
        reject(err);
      });
  });
}

export const paymentService = {
  purchaseViaBillPlz,
  purchaseViaStripe,
};
