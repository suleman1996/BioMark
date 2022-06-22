import { NotificationMessage } from 'types/api';

export class NotificationState {
  allInboxNotifications: NotificationMessage[] = [];
  allOthersNotifications: NotificationMessage[] = [];
  allOthersUnreadNotifications: NotificationMessage[] = [];
  allInboxUnreadNotifications: NotificationMessage[] = [];
}
