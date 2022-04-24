import { ApiResponse } from './api-response';

export type CovidCompanyListResponse = ApiResponse<CovidCompanyList>;

export interface CovidCompanyList {
  status: boolean;
  data: {
    header: string;
    companies: CovidCompanyDetails[];
  };
}

export interface CovidCompanyDetails {
  name: string;
  status: string;
  company_id: number;
}

export interface CovidCompanyInvitationRequest {
  companies: {
    company_id: number;
    accept: boolean;
  };
}

export interface CovidCompanyInvitationResponse {
  status: boolean;
  data: {
    name: string;
    status: string;
    company_id: number;
  };
}
