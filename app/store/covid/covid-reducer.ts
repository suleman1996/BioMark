import {
  COVID_RESULTS_DATA,
  COVID_BOOKINGS_DATA,
  COVID_BOOKING_FORM,
  COVID_BOOKING,
  COVID_HOME_RESULTS,
  COVID_SUCCESS_PAYMENT_DATA,
} from './constants';
import { CovidState } from './CovidState';

const INITIAL_STATE = new CovidState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case COVID_RESULTS_DATA: {
      return {
        ...state,
        allCovidResults: action.payload,
      };
    }

    case COVID_BOOKINGS_DATA: {
      return {
        ...state,
        allBookingsData: action.payload,
      };
    }

    case COVID_BOOKING_FORM: {
      return {
        ...state,
        bookingForm: action.payload,
      };
    }

    case COVID_BOOKING: {
      return {
        ...state,
        booking: action.payload,
      };
    }

    case COVID_HOME_RESULTS: {
      return {
        ...state,
        covidHomeResults: action.payload,
      };
    }

    case COVID_SUCCESS_PAYMENT_DATA: {
      return {
        ...state,
        covidSuccessPaymentData: action.payload,
      };
    }

    default:
      return state;
  }
}
