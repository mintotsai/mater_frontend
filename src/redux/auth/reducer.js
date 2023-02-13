import { LOGIN_SUCCESS_ACTION, LOGIN_FAIL_ACTION, SHOW_OTP_ACTION, VERIFY_FAIL_ACTION, CONFIRMATION_FAIL_ACTION, SHOW_RESET_PASSWORD_ACTION } from "./actions";
import { UPDATE_USER_ACTION, UPDATE_USER_SUCCESS_ACTION, UPDATE_USER_FAIL_ACTION, UPDATE_TRUE_USER_ACTION } from "../auth/actions";
import initialState from "./state"
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case REGISTER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //   };
    // case REGISTER_FAIL:
    //   return {
    //     ...state,
    //     isLoggedIn: false,
    //   };
    case LOGIN_SUCCESS_ACTION:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAIL_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case VERIFY_FAIL_ACTION:
      return {
        ...state,
        isLoggedIn: false,
      };
    case SHOW_OTP_ACTION:
      return {
        ...state,
        showOTPScreen: payload.showOTPScreen,
        user: payload.user
      };
    case UPDATE_USER_ACTION:
      return {
        ...state,
        user: payload,
      };
    case UPDATE_USER_SUCCESS_ACTION:
      return {
        ...state,
        user: payload,
      };
    case CONFIRMATION_FAIL_ACTION:
      return {
        ...state,
        emailConfirmed: false
      }
    case SHOW_RESET_PASSWORD_ACTION:
      return {
        ...state,
        showResetPasswordScreen: payload.showResetPasswordScreen,
        resetToken: payload.resetToken
      }
    case UPDATE_TRUE_USER_ACTION:
      return {
        ...state,
        trueUser: payload,
      };
    default:
      return state;
  }
}