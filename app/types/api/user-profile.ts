export interface CreateNewProfileRequest {
  profile: {
    first_name: string;
    last_name: string;
    birth_date: string;
    gender_id: Gender;
    ic_number?: string | null;
    marketing: boolean;
    mobile: string;
    email: string;
  };
}

export interface SetNewProfileRequest {
  profile: {
    first_name: string;
    last_name: string;
    birth_date: string;
    gender_id: Gender;
    mobile: string;
  };
}

export interface CreateNewProfileResponse {
  message: string;
}

// Biomark enum
export enum GenderValues {
  male = '1',
  female = '2',
}

export type Gender = GenderValues.male | GenderValues.female;
