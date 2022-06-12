import {
  CovidBookingListResponseData,
  CovidResultListResponse,
} from 'types/api';

export class CovidState {
  allCovidResults: CovidResultListResponse[] = [];
  allBookingsData: CovidBookingListResponseData = {
    history: [],
    upcoming: [],
  };
}
