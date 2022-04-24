import { ApiResponse } from './api-response';

export interface LastResultsResponse {
  status: boolean;
  data: ResultResponse;
}

export interface PastResultsResponse {
  status: boolean;
  data: { message: string } | ResultResponse[];
}

export interface ResultResponse {
  lab_id: number;
  message: string;
  name: string;
  received: string;
  ref_no: string;
  source: string;
  result: {
    summary?: string;
    doctor?: string;
    note?: string;
    status?: string;
    tag?: string;
  };
}

export interface LabResultPayload {
  result: {
    lab_ref_id: string;
    date_of_test: string;
    date_of_result: string;
    has_pdf: boolean;
    lab_id: number;
  };
  upload: {
    id: number;
    name: string;
    document_type_id: number;
    document_other_type: string;
    document_source_id: number;
    document_other_source: string;
    status: number;
    document_tag_id: number;
    document_review_id: number;
    app_tag_id: number;
    document_source_name: string;
    document_type_name: string;
    document_date: string;
    document_attachments: {
      id: number;
      document: { url: string };
      file_type: string;
    }[];
    document_tag_name: string;
    app_tag_name: string;
    document_status_name: string;
    document_review_name: string;
    document_caption: string;
  };
}

export interface EncodedResultOverviewPayload {
  lab_id: number;
  name: string;
  received: string;
  ref_no: string;
  source: string;
  result: {
    status?: string;
    summary?: string;
    doctor?: string;
    note?: string;
  };
  panel: EncodedResultOverviewPanel[];
}

export interface EncodedResultOverviewPanel {
  name: string;
  biomarker: EncodedResultOverviewBiomarker[];
}

export interface EncodedResultOverviewBiomarker {
  lab_id: number;
  name: string;
  findings: string;
  value: string | number;
  chart_type: number;
  unit: string;
  biomarker_id: string;
  provider_id: number;
  definition: string;
}

export interface LabStatusResponse {
  status: boolean;
  data: LabStatusPayload[];
}

export interface LabStatusPayload {
  id: number;
  lab_ref_id: string;
  result_status: string;
  status_order: number;
  status_message: string;
  status_name: string;
}

export type EncodedResultOverviewResponse = ApiResponse<EncodedResultOverviewPayload>;
export type LabResultResponse = ApiResponse<LabResultPayload>;

export interface LabStatusResponse {
  status: boolean;
  data: LabStatusPayload[];
}

export interface ResultVerifyAvailabilityRequest {
  result: {
    barcode: string;
  };
}

export interface ResultVerifyRequest {
  result: {
    barcode: string;
    identification_id: string;
  };
}

export interface ResultVerifyAvailabilityResponse {
  status: boolean;
  data: {
    available: boolean;
    description: string;
    field: string;
    hint_text: string;
  };
}

export interface ResultVerifyResponse {
  status: boolean;
  data: {
    status: boolean,
    type: string,
    method: string,
    message?: string,
    data?: {
      lab_id?: number
    };
  };
}

export interface ResultSummaryPayload {
  latest: {
    date_of_test: string;
    value: string;
    unit: string;
    ref_range: string;
    provider_id: number;
    provider_name: string;
    chart_type: number;
    quantitative: boolean;
    finding: string;
  };
  name: string;
  definition: string;
  description: {
    low_reading: string;
    normal_reading: string;
    high_reading: string;
  };
  providers: ResultSummaryPayloadProvider[];
  history: ResultSummaryPayloadHistory[];
  articles: ResultSummaryPayloadArticle[];
}

export interface ResultSummaryPayloadProvider {
  id: number;
  name: string;
}

export interface ResultSummaryPayloadArticle {
  title: string;
  thumbnail: string;
  link: string;
}

export interface ResultSummaryPayloadHistory {
  id: number;
  finding: string;
  unit: string;
  observation_value: string;
  chart_type: number;
  reference_range: string;
  date_of_test: string;
  provider_id: number;
  provider_name: string;
  has_pdf: number;
  comment: string;
}

export type ResultSummaryResponse = ApiResponse<ResultSummaryPayload>;

export interface ResultSummaryLabPDFResponse {
  status: boolean;
  data: string;
}

export interface ResultSummaryChartDataPoint {
  observation_value: string;
  finding: string;
  date_of_test: string;
}

export interface ResultSummaryChartSection {
  range: ResultSummaryChartSectionRange;
  label: string;
  finding: string;
  simple_label: string;
  long_label: string;
  range_label: string;
}

export interface ResultSummaryChartSectionRange {
  min: number;
  max: number;
}

export interface ResultSummaryChartPayload {
  results: ResultSummaryChartDataPoint[];
  name: string;
  unit: string;
  finding: string;
  chart_type: number;
  quantitative: boolean;
  high_label: string;
  normal_high_label: string;
  normal_low_label: string;
  low_label: string;
  high_range: string;
  normal_high_range: string;
  normal_low_range: string;
  low_range: string;
  min: number;
  max: number;
  sections: ResultSummaryChartSection[];
}

export interface ResultSummaryChartParams {
  provider: number;
  date: string;
}

export type ResultSummaryChartResponse = ApiResponse<ResultSummaryChartPayload>;
