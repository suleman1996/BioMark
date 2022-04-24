import { ApiResponse } from './api-response';

export type MarketingResponse = ApiResponse<{ enable: boolean; }>;

export interface MarketingRequest {
  marketing: {
    enable: boolean;
  };
}
