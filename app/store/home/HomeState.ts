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
  PspDataContents: PspModuleDataContents[] = [];
  getLabStatusData: LabStatusPayload[] = [];
  getResultOverViewData: ResultResponse[] = [];
  getLatestResultData: EncodedResultOverviewPayload[] = [];
  getPastResultData: LabStatusResponse[] = [];
  weightLogsData: WeightProgressLogsPayload[] = [];
  bloodSugarLogsData: BloodSugarProgressLogsPayload[] = [];
  hba1cLogsData: Hba1CProgressLogsPayload[] = [];
  bPLogsData: BloodPressureProgressLogsPayload[] = [];
}
