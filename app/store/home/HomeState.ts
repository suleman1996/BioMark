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
  TargetUnit,
  LatestBloodSugarResponse,
  LatestHba1CResponse,
  GetBloodSugarTargetsResponseData,
  GetHba1cTargetsResponseData,
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
  LabUploadPayload,
  MedicationTracker,
  HealthFeed,
} from 'types/api';
export class HomeState {
  healthTracker: HealthTrackerPayload[] = [];
  medicalDropDown: MedicationSetupPayload[] = [];
  dashboard: DashboardResponseData | undefined = undefined;
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
  getPendingResultOverviewData: LabUploadPayload[] = [];
  bloodSugarUnits: TargetUnit[] = [];
  hbA1cUnits: TargetUnit[] = [];
  bloodSugarTargets: GetBloodSugarTargetsResponseData[] = [];
  hbA1cTargets: GetHba1cTargetsResponseData[] = [];
  latestBloodSugar: LatestBloodSugarResponse | null = null;
  latestHba1c: LatestHba1CResponse | null = null;
  pspHypertensionHealthTracker: HealthTrackerPayloadData[] = [];
  getHealthFeeds: HealthFeed[] = [];
  getWeightProgressData: WeightProgressEntryPayload[] = [];
  getBpProgressData: BloodPressureProgressEntryPayload[] = [];
  getBsProgressData: BloodSugarProgressEntryPayload[] = [];
  getHba1cProgressData: Hba1CProgressEntryPayload[] = [];
  getMedicationProgressData: MedicationTrackerPayload[] = [];
  weightLogsData: WeightProgressLogsPayload[] = [];
  bloodSugarLogsData: BloodSugarProgressLogsPayload[] = [];
  hba1cLogsData: Hba1CProgressLogsPayload[] = [];
  bPLogsData: BloodPressureProgressLogsPayload[] = [];
  medicationTrackers: MedicationTracker | null = null;
}
