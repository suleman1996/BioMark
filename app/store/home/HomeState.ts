import { HealthTrackerPayload, DashboardResponseData } from 'types/api';
export class HomeState {
  healthTracker: HealthTrackerPayload[] = [];
  dashboard: DashboardResponseData[] = [];
}
