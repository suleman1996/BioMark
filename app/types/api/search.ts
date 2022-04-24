export interface SearchQueryResultResponse {
  status: boolean;
  data: SearchQueryResultData;
}

export interface SearchQueryParams {
  lab?: number;
  q?: string;
}

export interface SearchQueryResultData {
  query: string;
  results: SearchResults;
  result_card?: ResultCard[];
  doctor_card?: DoctorCard[];
}

export interface SearchResults {
  biomarker_card?: BioMarkerCard[];
  panel_card?: PanelCard[];
}

export interface SearchResultCard {
  name: string;
  id: number;
  source: BioMarkerCard | PanelCard | ResultCard | DoctorCard;
}

export interface BioMarkerCard {
  name: string;
  biomarker_id: number;
}

export interface Biomarker {
  id: number;
  name: string;
}

export interface PanelCard {
  id: number;
  header_name: string;
  mapping_priority: number;
  biomarkers: Biomarker[];
}

export interface ResultCard {
  lab_id: number;
  test_name: string;
  test_data: string;
  doctor_name: string;
  source: string;
}

export interface DoctorCard {
  doctor_name: string;
  labs: ResultCard[];
}
