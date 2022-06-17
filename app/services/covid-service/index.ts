import { API_URLS } from 'services/url-constants';
import {
  BookingFormDataResponse,
  CovidBookingHealthDeclarationRequest,
  CovidBookingListResponseData,
  CovidResponseData,
  CovidResultListResponse,
  ResultSummaryLabPDFResponse,
  TestCenterResponse,
  TestCentreScheduleResponse,
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

export const covidService = {
  getCovidResults,
  getCovidSingleResults,
  getCovidResultDownload,
  getBookingsData,
  updateHealthDeclaration,
  getBookingsForm,
  getCovidTestAndTestCenters,
  getCovidTestCentersSchedules,
};
