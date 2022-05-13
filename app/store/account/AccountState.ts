import { BootstrapData, MedicalTemplates } from './../../types/api/bootstrap';
import { DependentData } from 'types/api/dependent';
import { GeoLocationData } from 'types/api/geolocation';
export class AccountState {
  allDependents: DependentData[] = [];
  bootstrap: BootstrapData = {
    attributes: {
      country: [],
      gender: [],
      medical_template: null as unknown as MedicalTemplates,
    },
  };
  geolocation: GeoLocationData = {
    ip: '',
    location: '',
    code: '',
  };
}
