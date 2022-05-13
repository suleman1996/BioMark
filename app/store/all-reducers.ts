import { combineReducers } from 'redux';
import accountReducer from './account/account-reducer';
import authReducer from './auth/auth-reducer';
import notificationsReducer from './notifications/notifications-reducer';
import profileReducer from './profile/profile-reducer';

export const allReducers = combineReducers({
  auth: authReducer,
  account: accountReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
});
