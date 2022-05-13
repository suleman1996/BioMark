import { MEDICAL_HISTORY_UPDATE } from './constants';

export const addMedicalHistoryUpdate = (data: any) => ({
  type: MEDICAL_HISTORY_UPDATE,
  payload: data,
});
