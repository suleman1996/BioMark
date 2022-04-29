import { AccountState } from './account/AccountState';
import { AuthState } from './auth/AuthState';

export interface IAppState {
  auth: AuthState;
  account: AccountState;
}
