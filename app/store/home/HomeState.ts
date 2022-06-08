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
  ResultResponse,
  EncodedResultOverviewPayload,
  LabStatusResponse,
  HealthTrackerPayloadData,
  WeightProgressEntryPayload,
  BloodPressureProgressEntryPayload,
  BloodSugarProgressEntryPayload,
  Hba1CProgressEntryPayload,
  MedicationTrackerPayload,
  WeightProgressLogsPayload,
  BloodSugarProgressLogsPayload,
  Hba1CProgressLogsPayload,
  BloodPressureProgressLogsPayload,
} from 'types/api';
export class HomeState {
  healthTracker: HealthTrackerPayload[] = [];
  medicalDropDown: MedicationSetupPayload[] = [];
  dashboard: DashboardResponseData[] = [];
  healthRisks: RiskData[] = [];
  medicationList: MedicationListEntry[] = [];
  getNewMedicationTracker: MedicationTrackerSetup[] = [];
  pspModuleData: PspModule[] = [];
  pspHyperModuleData: PspModule[] = [];
  PspDataContents: PspModuleDataContents[] = [];
  PspHyperDataContents: PspModuleDataContents[] = [];
  getLabStatusData: LabStatusPayload[] = [];
  getResultOverViewData: ResultResponse[] = [];
  getLatestResultData: EncodedResultOverviewPayload[] = [];
  getPastResultData: LabStatusResponse[] = [];
  pspHypertensionHealthTracker: HealthTrackerPayloadData[] = [];
  getWeightProgressData: WeightProgressEntryPayload[] = [];
  getBpProgressData: BloodPressureProgressEntryPayload[] = [];
  getBsProgressData: BloodSugarProgressEntryPayload[] = [];
  getHba1cProgressData: Hba1CProgressEntryPayload[] = [];
  getMedicationProgressData: MedicationTrackerPayload[] = [];
  weightLogsData: WeightProgressLogsPayload[] = [];
  bloodSugarLogsData: BloodSugarProgressLogsPayload[] = [];
  hba1cLogsData: Hba1CProgressLogsPayload[] = [];
  bPLogsData: BloodPressureProgressLogsPayload[] = [];
}
