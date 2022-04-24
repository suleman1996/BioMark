import { ApiResponse } from './api-response';

// healthkit
export interface HealthKitStatus {
    isAvailable: boolean;
    isAuthorized: boolean;
}

// record
export interface HealthSnapshotRecord {
  has_widgets: boolean;
  has_goals: boolean;
  has_records: boolean,
  overview: SnapshotOverview[],
  weekly: SnapshotWeekly[]
}

export interface HealthSnapshotData {
    health_snapshot_type_id: number;
    source: string;
    calories: string;
    distance: string;
    value: string;
    unit: string;
    data_id: string;
    data_type: string;
    activity_type: string;
    start_date: string;
    end_date: string;
}

export interface HealthSnapshotRecordRequest {
    health_snapshot: {
        records: HealthSnapshotData[]
    }
}
export interface HealthSnapshot {
    id: string;
    name: string;
    title: string;
    icon_false: string;
    icon_true: string;
    color_primary: string;
    color_secondary: string;
    goal_unit: string;
    goal_label: string;
}

export interface SnapshotRecord {
    date: string;
    value: number;
}

export interface SnapshotOverview {
    health_snapshot: HealthSnapshot;
    goal: number;
    value: number;
}

export interface SnapshotWeekly {
    health_snapshot: HealthSnapshot;
    weeklyChartOptions: any;
    record: SnapshotRecord[];
}

// goal
export interface HealthSnapshotGoal {
    id: number;
    health_snapshot_type_id: number;
    health_snapshot_type: HealthSnapshot;
    value: string;
}

export interface HealthSnapshotGoalRequest {
    health_snapshot: {
        goals: HealthSnapshotGoal[]
    }
}

// widgets
export interface HealthSnapshotWidget {
    id: string;
    in_overview: boolean;
    in_weekly: boolean;
    is_active: boolean;
    health_snapshot_type: HealthSnapshot;
}

export interface HealthSnapshotWidgetRequest {
    health_snapshot: {
        widgets: HealthSnapshotWidget
    }
}

export type HealthSnapshotResponse = ApiResponse<HealthSnapshotRecord>;
export type HealthSnapshotWidgetResponse = ApiResponse<HealthSnapshotWidget>;
export type HealthSnapshotGoalResponse = ApiResponse<HealthSnapshotGoal[]>;
export type HealthSnapshotDataResponse = ApiResponse<HealthSnapshotData>;