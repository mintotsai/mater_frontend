import { LOGIN_SUCCESS_ACTION, LOGIN_FAIL_ACTION, LOGOUT_ACTION } from "./actions";
import { UPDATE_USER_ACTION, UPDATE_USER_SUCCESS_ACTION, UPDATE_USER_FAIL_ACTION } from "../auth/actions";
import initialState from "./state"

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
        user: payload.user,
      };
    case LOGIN_FAIL_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT_ACTION:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case UPDATE_USER_SUCCESS_ACTION:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
}