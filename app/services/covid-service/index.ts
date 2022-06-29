import { API_URLS } from 'services/url-constants';
import {
  BookingFormDataResponse,
  CovidBookingHealthDeclarationRequest,
  CovidBookingListResponseData,
  CovidLatestResponse,
  CovidResponseData,
  CovidResultListResponse,
  ResultSummaryLabPDFResponse,
  TestCenterResponse,
  TestCentreScheduleResponse,
  UpdateICRequest,
  UpdateICResponseData,
} from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';

function getCovidResults() {
  return new Promise<Array<CovidResultListResponse[]>>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_GET_RESUTLS}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get results error response 2.', err);
        reject(err);
      });
  });
}

function getCovidSingleResults(id: string) {
  return new Promise<CovidResponseData>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_GET_RESUTLS}/${id}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get covid single  results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get covid single results error response 2.', err);
        reject(err);
      });
  });
}

function getCovidResultDownload(id: string) {
  return new Promise<ResultSummaryLabPDFResponse>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_GET_RESUTLS_DOWNLOAD_V1}/${id}/download`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid result download login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid  result download response 2.', err);
        reject(err);
      });
  });
}

function getBookingsData() {
  return new Promise<Array<CovidBookingListResponseData>>((resolve, reject) => {
    client
      .get(`${API_URLS.GET_BOOKINGS}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get results error response 2.', err);
        reject(err);
      });
  });
}

// en.json
// pages => covid =>  bookCovid => covidHealthcare
// declaration
function updateHealthDeclaration(
  request: CovidBookingHealthDeclarationRequest
) {
  return new Promise<Array<CovidBookingListResponseData>>((resolve, reject) => {
    client
      .post(`${API_URLS.COVID_HEALTH_DECLARATION}`, request)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get results error response 2.', err);
        reject(err);
      });
  });
}
function updateMultiPleHealthDeclaration(
  request: CovidBookingHealthDeclarationRequest
) {
  console.log('request', request);

  return new Promise<Array<CovidBookingListResponseData>>((resolve, reject) => {
    client
      .post(`${API_URLS.COVID_MULTIPLE_HEALTH_DECLARATION}`, {
        booking: request,
      })
      .then(async (response: any) => {
        console.log('resMulti', response);

        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get results block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get results error response 2.', err);
        reject(err);
      });
  });
}

function updateUserIcNumber(request: UpdateICRequest) {
  return new Promise<UpdateICResponseData>((resolve, reject) => {
    client
      .post(`${API_URLS.UPDATE_USER_IC}`, request)
      .then(async (response: any) => {
        try {
          resolve(response);
        } catch (e) {
          logNow('update user ic response.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('update user ic error.', err);
        reject(err);
      });
  });
}

function getBookingsForm() {
  return new Promise<Array<BookingFormDataResponse>>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_BOOKING_FORM}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid bookings form get', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid bookings form error.', err);
        reject(err);
      });
  });
}

function getCovidTestAndTestCenters(cityId: string) {
  return new Promise<Array<TestCenterResponse[]>>((resolve, reject) => {
    client
      .get(`${API_URLS.COVID_TEST_AND_TEST_CENTERS}/${cityId}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get test centers', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get test centers error.', err);
        reject(err);
      });
  });
}

function getCovidTestCentersSchedules(test_centre_id: number) {
  return new Promise<TestCentreScheduleResponse>((resolve, reject) => {
    client
      .post(`${API_URLS.COVID_GET_TEST_CENTER_SCHEDULES}`, {
        test_centre: {
          test_centre_id: test_centre_id,
        },
      })
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('covid get test centers schedules error', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('covid get test centers schedules error.', err);
        reject(err);
      });
  });
}

function getCovidHomeResults() {
  return new Promise<Array<CovidLatestResponse[]>>((resolve, reject) => {
    client
      .get(`${API_URLS.RESULTS_FOR_COVID_HOME}`)
      .then(async (response: any) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('get covid home results', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('get covid home results error.', err);
        reject(err);
      });
  });
}
const batchReadForUpcomming = ({ data }: Props) => {
  console.log('data====>', data);

  return client.post(API_URLS.BATCH_READ_UPCOMMING, {
    unreadBooking: data,
  });
};

export const covidService = {
  getCovidResults,
  getCovidSingleResults,
  getCovidResultDownload,
  getBookingsData,
  updateHealthDeclaration,
  getBookingsForm,
  getCovidTestAndTestCenters,
  getCovidTestCentersSchedules,
  getCovidHomeResults,
  batchReadForUpcomming,
  updateUserIcNumber,
  updateMultiPleHealthDeclaration,
};
