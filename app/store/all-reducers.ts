import { combineReducers } from 'redux';
import accountReducer from './account/account-reducer';
import authReducer from './auth/auth-reducer';

export const allReducers = combineReducers({
  auth: authReducer,
  account: accountReducer,
});
