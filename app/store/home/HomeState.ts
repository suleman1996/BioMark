import {
  HealthTrackerPayload,
  DashboardResponseData,
  MedicationSetupPayload,
} from 'types/api';
export class HomeState {
  healthTracker: HealthTrackerPayload[] = [];
  medicalDropDown: MedicationSetupPayload[] = [];
  dashboard: DashboardResponseData[] = [];
}
