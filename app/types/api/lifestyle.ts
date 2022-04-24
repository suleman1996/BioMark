import { ApiResponse } from './api-response';

export interface LifestyleResponsePayload {
  smoking: LifestyleSmoking | null;
  drinking: LifestyleDrinking | null;
  exercise: LifestyleExercise | null;
  sleep: LifestyleSleep | null;
  stress: LifestyleStress | null;
}

export type LifestyleResponse = ApiResponse<LifestyleResponsePayload>;

export type LifestyleSection =
  | LifestyleSmoking
  | LifestyleDrinking
  | LifestyleExercise
  | LifestyleSleep
  | LifestyleStress;

export interface LifestyleSmoking {
  is_smoking: string;
  stick_per_day: number | null;
  smoking_stop_at: number | null;
  smoking_start_at: number | null;
}

export interface LifestyleDrinking {
  is_drinking: boolean;
  pints_of_beer: number;
  glasses_of_wine: number;
  shots_of_spirits: number;
}

export interface LifestyleExercise {
  is_exercise: boolean;
  exercise_per_week: number | null;
  exercise_per_session: number | null;
}

export interface LifestyleSleep {
  sleep_duration: number | null;
}

export interface LifestyleStress {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
}
