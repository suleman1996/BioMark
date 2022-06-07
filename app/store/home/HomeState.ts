import {
  HealthTrackerPayload,
  DashboardResponseData,
  MedicationSetupPayload,
  RiskData,
  MedicationListEntry,
  MedicationTrackerSetup,
  PspModule,
  PspModuleDataContents,
  LabStatusPayload,
  EncodedResultOverviewPayload,
  LabStatusResponse,
} from 'types/api';
export class HomeState {
  healthTracker: HealthTrackerPayload[] = [];
  medicalDropDown: MedicationSetupPayload[] = [];
  dashboard: DashboardResponseData[] = [];
  healthRisks: RiskData[] = [];
  medicationList: MedicationListEntry[] = [];
  getNewMedicationTracker: MedicationTrackerSetup[] = [];
  pspModuleData: PspModule[] = [];
  PspDataContents: PspModuleDataContents[] = [];
  getLabStatusData: LabStatusPayload[] = [];
  getLatestResultData: EncodedResultOverviewPayload[] = [];
  getPastResultData: LabStatusResponse[] = [];
}
