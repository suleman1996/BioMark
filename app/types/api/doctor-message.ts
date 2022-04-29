import { ApiResponse } from './api-response';

export type DoctorMessageResponse = ApiResponse<DoctorMessageResponseData>;

export interface DoctorMessageResponseData {
  sender: SenderData;
  messages: MessagesData[];
}

export interface SenderData {
  name: string;
  picture: string;
  phone_number: string;
}

export interface MessagesData {
  id: string;
  body: string;
  created_at: string;
}
