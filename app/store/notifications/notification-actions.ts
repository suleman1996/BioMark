import { notificationsService } from 'services/notification-service';
import { NotificationMessage } from 'types/api';
import { Appointment } from 'types/api/appointment';
import { logNow } from 'utils/functions/log-binder';
import {
  INBOX_NOTIFICATIONS,
  INBOX_OTHERS,
  INBOX_OTHERS_UNREAD,
  INBOX_ALL_UNREAD,
  APPOINTMENT_COUNTS,
  INSIGHTS,
} from './constants';

export const addAllInboxNotifications = (data: NotificationMessage[]) => ({
  type: INBOX_NOTIFICATIONS,
  payload: data,
});

export const addAllInsights = (data: NotificationMessage[]) => ({
  type: INSIGHTS,
  payload: data,
});

export const getAllInboxNotificationsR =
  (page: number = 1) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await notificationsService
      .getAllinboxNotifications(page)
      .then(async (res: any) => {
        // logNow('response for redux ============>', res)
        await dispatch(addAllInboxNotifications(res));
      })
      .catch((err) => {
        logNow(err);
      });

    await notificationsService
      .getAllInsights(page)
      .then(async (res: any) => await dispatch(addAllInsights(res)))
      .catch((err) => logNow(err));
  };

export const addAllOtherNotifications = (data: NotificationMessage[]) => ({
  type: INBOX_OTHERS,
  payload: data,
});

export const getAllOtherNotificationsR =
  (page: number = 1) =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await notificationsService
      .getAlliOthersNotifications(page)
      .then(async (res: any) => {
        // logNow('response for redux ============>', res)
        await dispatch(addAllOtherNotifications(res));
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

export const addAllOtherUnreadNotifications = (
  data: NotificationMessage[]
) => ({
  type: INBOX_OTHERS_UNREAD,
  payload: data,
});

export const getAllOtherUnreadNotificationsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await notificationsService
      .getAlliOthersUnreadNotifications()
      .then(async (res: any) => {
        // logNow('response for redux ============>', res)
        await dispatch(addAllOtherUnreadNotifications(res));
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

export const addAllInboxUnreadNotifications = (
  data: NotificationMessage[]
) => ({
  type: INBOX_ALL_UNREAD,
  payload: data,
});

export const getAllInboxUnreadNotificationsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await notificationsService
      .getAlliInboxUnreadNotifications()
      .then(async (res: any) => {
        await dispatch(addAllInboxUnreadNotifications(res));
      })
      .catch((err) => {
        logNow(err);
      })
      .finally(() => {});
  };

// GET APPOINTMENTS COUNTS
export const addAllAppointmentCounts = (data: Appointment) => ({
  type: APPOINTMENT_COUNTS,
  payload: data,
});

export const getAllApointmentsCountsR =
  () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    await notificationsService
      .getAllAppointmentsCounts()
      .then(async (res: any) => {
        logNow('addAllAppointmentCounts============>', res);
        await dispatch(addAllAppointmentCounts(res));
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
