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

const VOUCHER = 'BIOMARK21';

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
      .then(async (res: any) => {
        logNow({ res: res });
        resolve(res);
      })
      .catch((err) => {
        logNow(err);
        reject(err);
      });
  });
}

function openStripeBrowser(booking: BookTestBooking[], email: string) {
  return new Promise((resolve, reject) => {
    let items = booking.map((e) => {
      return {
        item_name: 'Test id: ' + e.test_type_id,
        amount: e.amount,
        quantity: 1,
        currency: e.currency,
      };
    });
    let payload: any = {
      payment: {
        success_url: Config.BASE_URL + '/payment/v1/stripe/success',
        cancel_url: Config.BASE_URL + '/payment/v1/stripe/cancel',
        email: email,
        mode: 'payment',
        pay_methods: ['card'],
        items: items,
        voucher: VOUCHER,
      },
    };
    newStripeSession(payload)
      .then((res: any) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function newStripeSession(data: CreateStripeSessionRequest) {
  return new Promise<StripeSession>((resolve, reject) => {
    client
      .post(`${API_URLS.STRIPE_PAY_SESSION}`, data)
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

function saveDataAfterPayment(booking: BookTestBooking[], email: string) {
  new Promise((resolve, reject) => {
    var bookingRequest: any = [];

    booking.forEach((element) => {
      bookingRequest.push({
        is_dependent: element.is_dependant,
        dependent_id: element.dependent_id,
        test_type_id: element.test_type_id,
        schedule_id: element.schedule_id,
        slot_id: element.slot_id,
        test_location: element.test_location,
        test_centre_name: element.test_centre_name,
        test_city_name: element.test_city_name,
        test_country_name: element.test_country_name,
        test_centre_id: element.test_centre_id,
        city_id: element.city_id,
        country_id: element.country_id,
        test_address: element.test_address,
        test_address_details: element.test_address_details,
        confirmation_date: new Date().toISOString(),
        amount: element.amount,
        total_amount: VOUCHER
          ? element.amount - element.amount * 0.1
          : element.amount,
        email: email,
        booking_status: 0,
        voucher: VOUCHER,
      });
    });

    const request = {
      booking: bookingRequest,
      email: email,
    };

    saveCovidBookingDepandant(request)
      .then((res: any) => {
        logNow({ resForCovidSave: res.data });
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });

    logNow({ request });
  });
}

function saveCovidBookingDepandant(request: any) {
  return new Promise((resolve, reject) => {
    client
      .post(`${API_URLS.SAVE_COVID_BOOKING_DEPENDANT}`, request)
      .then(async (response: any) => {
        try {
          logNow('SAVE COVID BOOKING  ===>', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('CATCH ERROR COVID BOOKING SAVE ==>', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('ERROR COVID BOOKING SAVE ===>.', err);
        reject(err);
      });
  });
}

export const paymentService = {
  purchaseViaBillPlz,
  openBillPlzBrowser,
  openStripeBrowser,
  saveDataAfterPayment,
};
