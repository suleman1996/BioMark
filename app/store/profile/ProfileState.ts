import {
  AlergiesRequestBody,
  MedicalHistoryCondition,
  MedicalHistoryResponseData,
  Profile,
} from 'types/api';

export class ProfileState {
  medicalHistoryUpdate: MedicalHistoryCondition[] = [];
  familyMedicalHistoryUpdate: MedicalHistoryCondition[] = [];
  allergiesMedicalHistoryUpdate: AlergiesRequestBody = [];
  medicalHistoryData: MedicalHistoryResponseData = {};
  userProfile: Partial<Profile> = {};
}
