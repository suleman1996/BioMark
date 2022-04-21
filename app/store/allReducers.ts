import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';

export const allReducers = combineReducers({
    auth: authReducer,
});