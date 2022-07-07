import { API_URLS } from 'services/url-constants';
import { NotificationMessage } from 'types/api';
import { ErrorResponse } from 'types/ErrorResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';
import { Appointment } from 'types/api/appointment';

function getAllinboxNotifications(page: number = 1) {
  return new Promise<Array<NotificationMessage>>((resolve, reject) => {
    client
      .get(`${API_URLS.NOTIFICATIONS}/inbox?page=${page}`)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('all notitificatio error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('all notification inbox error response 2.', err);
        reject(err);
      });
  });
}

function getAllInsights(page: number = 1) {
  return new Promise<Array<NotificationMessage>>((resolve, reject) => {
    client
      .get(`${API_URLS.INSIGHTS}?page=${page}`)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('all insights error block login 1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('all insights inbox error response 2.', err);
        reject(err);
      });
  });
}

function getAlliOthersNotifications(page: number = 1) {
  return new Promise<Array<NotificationMessage>>((resolve, reject) => {
    client
      .get(`${API_URLS.NOTIFICATIONS}/other?page=${page}`)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('other notitificatio error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('other notification inbox error response 2.', err);
        reject(err);
      });
  });
}

function getAlliOthersUnreadNotifications() {
  return new Promise<Array<NotificationMessage>>((resolve, reject) => {
    client
      .get(`${API_URLS.NOTIFICATIONS}/other/unread`)
      .then(async (response) => {
        try {
          //logNow('all notification inbox success response', response.data);
          resolve(response.data);
        } catch (e) {
          logNow('other unread notitificatio error block login1.', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('other unread notification inbox error response 2.', err);
        reject(err);
      });
  });
}
function getAlliInboxUnreadNotifications() {
  return new Promise<Array<NotificationMessage>>((resolve, reject) => {
    client
      .get(`${API_URLS.NOTIFICATIONS}/inbox/unread`)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('unread inbox notifiction', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('unread inbox notifiction erroe', err);
        reject(err);
      });
  });
}

function getAllAppointmentsCounts() {
  return new Promise<Appointment>((resolve, reject) => {
    client
      .get(`${API_URLS.GET_COVID_NOTIFICATIONS_COUNTS}`)
      .then(async (response) => {
        try {
          resolve(response.data);
        } catch (e) {
          logNow('get all appointment counts', e);
          reject(e);
        }
      })
      .catch(async (err: ErrorResponse) => {
        logNow('error in all appointment counts', err);
        reject(err);
      });
  });
}

const readInboxNotification = (id) => {
  return client.get(`${API_URLS.NOTIFICATIONS}/${id}/inbox_read`);
};

export const notificationsService = {
  getAllinboxNotifications,
  getAlliOthersNotifications,
  getAlliOthersUnreadNotifications,
  getAlliInboxUnreadNotifications,
  readInboxNotification,
  getAllAppointmentsCounts,
  getAllInsights,
};
