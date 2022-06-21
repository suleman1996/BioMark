import { covidService } from 'services/covid-service';
import {
  BookingFormDataResponse,
  BookTestBooking,
  CovidBookingListResponseData,
  CovidResultListResponse,
} from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import {
  COVID_RESULTS_DATA,
  COVID_BOOKINGS_DATA,
  COVID_BOOKING_FORM,
  COVID_BOOKING,
  COVID_HOME_RESULTS,
} from './constants';

export const addAllCovidResultsData = (data: CovidResultListResponse[]) => ({
  type: COVID_RESULTS_DATA,
  payload: data,
});

export const getAllCovidResultsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await covidService
      .getCovidResults()
      .then(async (res: any) => {
        // logNow('response for redux ============>', res);
        await dispatch(addAllCovidResultsData(res));
      })
      .catch((err) => {
        logNow(err);
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };

// adding bookings data
export const addAllBookingsData = (data: CovidBookingListResponseData) => ({
  type: COVID_BOOKINGS_DATA,
  payload: data,
});

export const getAllBookingsDataR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await covidService
      .getBookingsData()
      .then(async (res: any) => {
        // logNow('response for redux ============>', res);
        await dispatch(addAllBookingsData(res));
      })
      .catch((err) => {
        logNow(err);
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };

export const addCovidBookingForm = (data: BookingFormDataResponse) => ({
  type: COVID_BOOKING_FORM,
  payload: data,
});

export const getCovidBookingFormR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await covidService
      .getBookingsForm()
      .then(async (res: any) => {
        // logNow('response for redux ============>', res);
        await dispatch(addCovidBookingForm(res));
      })
      .catch((err) => {
        logNow(err);
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };

// get covid home results

export const addCovidHomeResults = (data: BookingFormDataResponse) => ({
  type: COVID_HOME_RESULTS,
  payload: data,
});

export const getCovidHomeResultsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await covidService
      .getCovidHomeResults()
      .then(async (res: any) => {
        logNow('covid home results for redux ============>', res);
        await dispatch(addCovidHomeResults(res));
      })
      .catch((err) => {
        logNow(err);
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
  };

// covid booking
export const addCovidBooking = (data: BookTestBooking[]) => ({
  type: COVID_BOOKING,
  payload: data,
});
