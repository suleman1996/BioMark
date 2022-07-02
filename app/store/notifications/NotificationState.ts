import { NotificationMessage } from 'types/api';
import { Appointment } from 'types/api/appointment';

export class NotificationState {
  allInboxNotifications: NotificationMessage[] = [];
  allOthersNotifications: NotificationMessage[] = [];
  allOthersUnreadNotifications: NotificationMessage[] = [];
  allInboxUnreadNotifications: NotificationMessage[] = [];
  allAppointmentCounts: Appointment = {
    covid_booking_count: 0,
    total_count: 0,
    booking_result_count: 0,
  };
}
