import { ApiResponse } from './api-response';
import { NotificationMessage } from './notification';
import { ResultResponse } from './results';
import { LabStatus, Result } from '../../modules/results/models/results.types';

export type DashboardResponse = ApiResponse<DashboardResponseData>;

export interface DashboardResponseData {
  psp_program: string;
  psp_user: boolean;
  psp_code: string;
  psp_terms: boolean;
  psp_onboarding: boolean;
  psp_onboarding_hypertension: boolean;
  complete_profile: boolean;
  has_lab_upload: boolean;
  has_blood_sugar_target: boolean;
  has_hba1c_target: boolean;
  new_message: NotificationMessage;
  latest_result: ResultResponse;
  program_detail: ProgramDetailResponseData;
}

export interface DashboardData {
  pspProgram: string;
  isPSP: boolean;
  code: string;
  onboarding: boolean;
  pspTerms: boolean;
  psp_onboarding_hypertension: boolean;
  isProfileCompleted: boolean;
  hasLabUpload: boolean;
  has_blood_sugar_target: boolean;
  has_hba1c_target: boolean;
  newMessage: NotificationMessage;
  latestResult: Result;
  labStatus: LabStatus[];
  programDetail: ProgramDetailResponseData;
}

export interface ProgramDetailResponseData {
  barcode: string;
  onboard_diabetes: boolean,
  onboard_hypertension: boolean,
  program_id: number,
  program_name: string,
  terms: boolean
}
