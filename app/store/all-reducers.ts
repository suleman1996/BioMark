import { combineReducers } from 'redux';
import authReducer from './auth/auth-reducer';

export const allReducers = combineReducers({
  auth: authReducer,
});
