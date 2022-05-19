import { ApiResponse } from './api-response';

export type GeoLocation = ApiResponse<GeoLocationData>;

export interface GeoLocationData {
  ip: string;
  location: string;
  code: string;
  dial_code: string;
}
