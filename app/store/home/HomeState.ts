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
  bloodSugarUnits: TargetUnit[] = [];
  hbA1cUnits: TargetUnit[] = [];
  bloodSugarTargets: GetBloodSugarTargetsResponseData[] = [];
  hbA1cTargets: GetHba1cTargetsResponseData[] = [];
  latestBloodSugar: LatestBloodSugarResponse | null = null;
  latestHba1c: LatestHba1CResponse | null = null;
}
