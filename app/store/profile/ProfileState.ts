import {
  MedicalHistoryCondition,
  MedicalHistoryResponseData,
  Profile,
} from 'types/api';

export class ProfileState {
  medicalHistoryUpdate: MedicalHistoryCondition[] = [];
  medicalHistoryData: MedicalHistoryResponseData = {};
  userProfile: Partial<Profile> = {};
}
