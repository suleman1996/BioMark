import { BootstrapData, MedicalTemplates } from './../../types/api/bootstrap';
import { DependentData } from 'types/api/dependent';

export class AccountState {
  allDependents: DependentData[] = [];
  bootstrap: BootstrapData = {
    attributes: {
      country: [],
      gender: [],
      medical_template: null as unknown as MedicalTemplates,
    },
  };
}
