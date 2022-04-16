import { AuthState } from './AuthState';
import {
    AUTH_ERR_LOG_IN,
    AUTH_ERR_LOG_OUT,
    AUTH_LOGGED_IN,
    AUTH_LOGGING_IN,
    AUTH_LOGGING_OUT,
    AUTH_LOGOUT,
    AUTH_USER
  } from './constants';
  
  const INITIAL_STATE = new AuthState;
  
  export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
      case AUTH_LOGOUT: {
        return new AuthState();
      }
  
      case AUTH_LOGGING_IN: {
        return {
          ...state,
          errorMessageLogin: action.payload ? null : state.errorMessageLogin,
          errorMessageLogout: null,
          loggingIn: action.payload,
        };
      }

      
      case AUTH_LOGGING_OUT: {
        return {
          ...state,
          errorMessageLogout: action.payload ? null : state.errorMessageLogout,
          loggingOut: action.payload,
        };
      }
  
      case AUTH_LOGGED_IN: {
        let {user, token} = action.payload;
        return {
          ...state,
          user,
          token,
          errorMessageLogin: null,
          loggingIn: false,
        };
      }

      case AUTH_USER: {
        let user = action.payload;
        return {
          ...state,
          user,
        };
      }
  
      case AUTH_ERR_LOG_IN: {
        return {
          ...state,
          loggingIn: false,
          errorMessageLogin: action.payload,
        };
      }
      
  
      case AUTH_ERR_LOG_OUT: {
        return {
          ...state,
          loggingOut: false,
          errorMessageLogout: action.payload,
        };
      }
  
      default:
        return state;
    }
  }