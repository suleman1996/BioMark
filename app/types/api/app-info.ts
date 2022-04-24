import { ApiResponse } from './api-response';

export type AppInfo = ApiResponse<AppInfoData>;

export interface AppInfoData {
    server_status: string;
    app_update: string;
    app_version: string;
}