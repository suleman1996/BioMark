import { ApiResponse } from './api-response';

export type SettingResponse = ApiResponse<Setting>;

export interface SettingUpdateRequest {
  settings: {
    auto_logout: boolean
  };
}

export interface Setting {
    auto_logout: boolean
}
