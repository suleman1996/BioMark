import {
  MedicalHistoryCondition,
  MedicalHistoryResponseData,
  Profile,
} from 'types/api';

export class ProfileState {
  medicalHistoryUpdate: MedicalHistoryCondition[] = [];
  familyMedicalHistoryUpdate: MedicalHistoryCondition[] = [];
  medicalHistoryData: MedicalHistoryResponseData = {};
  userProfile: Partial<Profile> = {};
}
