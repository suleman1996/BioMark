import {
  BookingFormDataResponse,
  BookTestBooking,
  CovidBookingListResponseData,
  CovidBookingResponseData,
  CovidLatestResponse,
  CovidResultListResponse,
} from 'types/api';

export class CovidState {
  allCovidResults: CovidResultListResponse[] = [];
  allBookingsData: CovidBookingListResponseData = {
    history: [],
    upcoming: [],
  };
  bookingForm: BookingFormDataResponse = {
    country_list: [],
    first_booking_voucher: false,
    has_user_ic: false,
  };
  booking: BookTestBooking[] = [];
  covidHomeResults: CovidLatestResponse[] = [];
  covidSuccessPaymentData: CovidBookingResponseData = {
    status: false,
    user_reference_code: '',
    dependent_reference_codes: [],
  };
}
