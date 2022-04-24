import { ApiResponse } from './api-response';

export type Bootstrap = ApiResponse<BootstrapData>;

export interface BootstrapData {
  attributes: {
    country: CountryAttribute[];
    gender: GenderAttribute[];
    medical_template: MedicalTemplates;
  };
}

export interface MedicalTemplates {
  personal: MedicalTemplateAttribute[];
  family: MedicalTemplateAttribute[];
  vaccine: MedicalTemplateAttribute[];
  allergy: MedicalTemplateAttribute[];
  smoking: MedicalTemplateAttribute[];
  drinking: MedicalTemplateAttribute[];
  exercise: MedicalTemplateAttribute[];
  stress: MedicalTemplateAttribute[];
  sleeping: MedicalTemplateAttribute[];
}

export type MedicalSection = keyof MedicalTemplates;

export interface CountryAttribute {
  id: number;
  name: string;
  dial_code: string;
  code: string;
}

export interface GenderAttribute {
  id: number;
  name: string;
}

export interface MedicalTemplateAttribute {
  id: number;
  name: string;
  medical_type: MedicalTemplateType;
  medical_order: number;
  content: MedicalTemplateContent;
}

export type MedicalTemplateType = 'personal' | 'family' | 'vaccine' | 'allergy' | 'smoking' | 'drinking' | 'exercise' | 'sleeping' | 'stress';

export interface MedicalTemplateContent {
  name: string;

  toggle?: boolean;
  fields?: MedicalTemplateField[];
}

export interface MedicalTemplateField {
  id: string;
  question: string;
  field_error: string;
  hint: string;
  gender: string;
  type: MedicalTemplateFieldType;
  options: string[];
  default: string;
  visible: boolean;
  dependent: string;
  dependent_value: string;
}

export type MedicalTemplateFieldType = 'multi_text' | 'radio' | 'dropdown' | 'dropdown_with_other' | 'multi_select' | 'slider';

export enum MedicalRiskFieldId {
  status = 'status',
  takingMedication = 'takingMedication',
  statusMedication = 'statusMedication',
  diabetesTypeMale = 'diabetesTypeMale',
  diabetesTypeFemale = 'diabetesTypeFemale',
  statusType = 'statusType',
  dropdownList = 'dropdownList',
  conditions = 'conditions',
  statusList = 'statusList',

  statusCount = 'statusCount',
  statusStart = 'statusStart',
  statusEnd = 'statusEnd',
  statusSession = 'statusSession',

  question1 = 'question1',
  question2 = 'question2',
  question3 = 'question3',
  question4 = 'question4',

  statusTreatment = 'statusTreatment',
  treatmentType = 'treatmentType',
  otherCondition = 'otherCondition',
  medications = 'medications'
}

export enum MedicalRiskFieldBoolean {
  true = 'Yes',
  false = 'No'
}

export enum MedicalRiskAllergyField {
  'No',
  'Yes',
  'Not Sure'
}

export enum MedicalRiskVaccineField {
  'No',
  'Yes',
  "Yes, but I'm not sure which vaccines"
}

// Hard-coded strings from API, hurray!
export const MedicationAllergy = 'Medication(s)';
