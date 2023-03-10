import {
  INBOX_NOTIFICATIONS,
  INBOX_OTHERS,
  INBOX_OTHERS_UNREAD,
  INBOX_ALL_UNREAD,
  APPOINTMENT_COUNTS,
  INSIGHTS,
} from './constants';
import { NotificationState } from './NotificationState';

const INITIAL_STATE = new NotificationState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case INBOX_NOTIFICATIONS: {
      return {
        ...state,
        allInboxNotifications: action.payload,
      };
    }

    case INBOX_OTHERS: {
      return {
        ...state,
        allOthersNotifications: action.payload,
      };
    }

    case INBOX_OTHERS_UNREAD: {
      return {
        ...state,
        allOthersUnreadNotifications: action.payload,
      };
    }
    case INBOX_ALL_UNREAD: {
      return {
        ...state,
        allInboxUnreadNotifications: action.payload,
      };
    }

    case APPOINTMENT_COUNTS: {
      return {
        ...state,
        allAppointmentCounts: action.payload,
      };
    }

    case INSIGHTS: {
      return {
        ...state,
        allInsights: action.payload,
      };
    }

    default:
      return state;
  }
}
