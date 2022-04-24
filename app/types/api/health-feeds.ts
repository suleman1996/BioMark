import { ApiResponse } from './api-response';

export interface HealthFeed {
  id: number;
  caption: string;
  link: string;
  filename: {
    url: string;
  };
}

export type HealthFeedsResponse = ApiResponse<HealthFeed[]>;
