import { AccountState } from './account/AccountState';
import { AuthState } from './auth/AuthState';
import { NotificationState } from './notifications/NotificationState';
import { ProfileState } from './profile/ProfileState';

export interface IAppState {
  auth: AuthState;
  account: AccountState;
  notifications: NotificationState;
  profile: ProfileState;
}
