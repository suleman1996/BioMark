import Config from 'react-native-config';
import { API_URLS } from 'services/url-constants';
import {
  BillplzPayment,
  BookTestBooking,
  CreateBillplzPaymentRequest,
  CreateStripeSessionRequest,
  StripeSession,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';

function openBillPlzBrowser(
  email: string,
  name: string,
  amount: any,
  booking: BookTestBooking[]
) {
  return new Promise<string>((resolve, reject) => {
    let desc = '';
    booking.forEach((e) => {
      desc = desc + e.test_type_id + '\n';
    });
    const payload = {
      email: email,
      name: name,
      amount: amount,
      description: desc,
    };
    //  console.log({payload: payload})
    purchaseViaBillPlz({
      payment: {
        email: payload.email,
        name: payload.name,
        callback: Config.BASE_URL + '/payment/v1/billplz/callback',
        redirect: Config.BASE_URL + '/payment/v1/billplz/callback',
        amount: payload.amount * 100,
        description: payload.description,
      },
    })
      .then(async (res) => {
        logNow({ res: res });
        resolve(res);

        //  InAppBrowser.open(res.url, {
        //    // iOS Properties
        //    ephemeralWebSession: false,
        //    // Android Properties
        //    showTitle: false,
        //    enableUrlBarHiding: true,
        //    enableDefaultShare: false,
        //  }).then((response) => {
        //    if (response.status == true) {
        //      console.log(response);
        //    }
        //    console.log('Else', response);
        //  }).catch(err => {
        //   console.log(err)
        //  });
      })
      .catch((err) => {
        logNow(err);
        reject(err);
      });
  });
}

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
  openBillPlzBrowser,
};
