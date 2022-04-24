import { ApiResponse } from './api-response';

export type AppointmentResponse = ApiResponse<Appointment>


export interface Appointment {
    covid_booking_count: number;
    total_count: number;
    booking_result_count: number;
}