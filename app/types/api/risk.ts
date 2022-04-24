export interface RisksResponse {
  data: RisksResponseData;
}

export interface RiskData {
  name: string;
  heading: string;
  description: string;
  card_status: string;
  status: string;
  result: string;
  button_type: string;
  value: string | number;
  unit: string;
  summary: string;
}

export interface RisksResponseData {
  heart: RiskData;
  diabetes: RiskData;
  bp: RiskData;
  bmi: RiskData;
  smoking: RiskData;
  sleeping: RiskData;
  stress: RiskData;
  drinking: RiskData;
}
