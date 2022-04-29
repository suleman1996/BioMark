export interface ApiResponse<T> {
  status: boolean;
  data: T;
}

export interface BasicResponse {
  message: string;
  type?: string;
  error?: string;
  condition?: string;
}

export type MessageResponse = ApiResponse<BasicResponse>;
