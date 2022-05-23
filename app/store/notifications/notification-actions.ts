import { notificationsService } from 'services/notification-service';
import { NotificationMessage } from 'types/api';
import { logNow } from 'utils/functions/log-binder';
import {
  INBOX_NOTIFICATIONS,
  INBOX_OTHERS,
  INBOX_OTHERS_UNREAD,
} from './constants';

export const addAllInboxNotifications = (data: NotificationMessage[]) => ({
  type: INBOX_NOTIFICATIONS,
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
        // After developer alow below function on line 66
        // dispatch(errorLogOut('Error logging out.'));
      })
      .finally(() => {
        // After developer alow below function on line 69
        // dispatch(loggingOut(false));
      });
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
