import { ApiResponse } from './api-response';

export interface NotificationPage {
  page: number;
}

export type NotificationResponse = ApiResponse<NotificationMessage[]>;

export interface ReadResponse {
  message: string;
}

export interface NotificationMessage {
  id: number;
  notification_id: number;
  notification_title: string;
  notification_body: string;
  notification_status: string;
  notification_type: string;
  created_at: string;
  isOpen?: boolean;
  has_pending_declaration: boolean;
}

export interface NotificationMessageRequest {
  unreadBooking: any;
}

export enum NotificationType {
  doctor = 'doctor',
  mcr = 'mcr',
  message = 'message',
  medical = 'medical',
  result = 'result',
  medication_reminder = 'medication_reminder',
  missed_medication = 'missed_medication',
  covid = 'covid',
  covid_result = 'covid_result',
}

export interface RegisterDeviceRequest {
  device: {
    device_token: string;
    device_type: string;
  };
}

export interface RegisterDeviceResponse {
  status: boolean;
  data: {
    message: string;
  };
}
