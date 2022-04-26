import { DependentData } from 'types/api/dependent';
import { DEPENDENTS } from './constants';

export const addAllDependents = (data: DependentData) => ({
  type: DEPENDENTS,
  payload: data,
});
