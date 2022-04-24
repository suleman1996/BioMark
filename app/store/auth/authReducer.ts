import { AuthState } from './AuthState';
import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  AUTH_USER,
  USER_CONTACTS,
  MARKETING,
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
        let {userToken, refreshToken, isFirstLogin, hasProfile, expiresIin} =
          action.payload;
        return {
          ...state,
          userToken,
          refreshToken,
          isFirstLogin,
          hasProfile,
          expiresIin,
          errorMessageLogin: null,
          loggingIn: false,
        };
      }

      case USER_CONTACTS: {
        const response = action.payload;
        return {
          ...state,
          userContacts: response,
        };
      }

      case MARKETING: {
        const response = action.payload;
        return {
          ...state,
          marketing: response,
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