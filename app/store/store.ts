import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { allReducers } from './allReducers';

const rootReducer = allReducers

export const store = createStore(rootReducer, applyMiddleware(thunk));