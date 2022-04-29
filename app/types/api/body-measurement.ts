import { ApiResponse } from './api-response';

export type BodyMeasurementsResponse = ApiResponse<BodyMeasurementsData>;

export interface BodyMeasurementsData {
  message: string;
}

export interface BodyMeasurementsRequest {
  medical: {
    height: string;
    weight: string;
    is_metric: boolean;
  };
}
