import {
  BookingFormDataResponse,
  BookTestBooking,
  CovidBookingListResponseData,
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
}
