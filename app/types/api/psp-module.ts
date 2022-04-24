import { ApiResponse } from './api-response';

export type PspModuleResponse = ApiResponse<PspModule>;
export type PspModuleDataResponse = ApiResponse<PspModuleDataContents>;

export interface PspModuleDataContents {
  link: string;
}

export interface PspModule {
  video: PspModuleData[];
  pdf: PspModuleData[];
}

export interface PspModuleData {
  name: string;
  code: string;
  thumbnail: string;
}

export interface OnboardingRequest {
  onboarding: { code: string; bm_program_id: number };
}

export interface MidasScannerRequest {
  code: string;
  terms: boolean;
}

export interface PSPData {
  isPSP: boolean;
  code: string;
  onboarding: boolean;
}

export interface WithdrawRequest {
  module: { barcode: string; bm_program_id: number };
}

export interface MidasTermsRequest {
  module: { terms: boolean };
}
