import { combineReducers } from 'redux';
import accountReducer from './account/account-reducer';
import authReducer from './auth/auth-reducer';
import notificationsReducer from './notifications/notifications-reducer';
import profileReducer from './profile/profile-reducer';
import homeReducer from './home/home-reducer';
import covidReducer from './covid/covid-reducer';
import eventReducer from './events/event-reducer';

export const allReducers = combineReducers({
  auth: authReducer,
  account: accountReducer,
  notifications: notificationsReducer,
  profile: profileReducer,
  home: homeReducer,
  covid: covidReducer,
  event: eventReducer,
});
