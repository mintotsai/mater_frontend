import { SET_CHECKOUT_SESSION_URL_ACTION, SET_PORTAL_SESSION_URL_ACTION } from "./actions";
import initialState from "./state";

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CHECKOUT_SESSION_URL_ACTION:
      return {
        ...state,
        checkoutSessionURL: payload
      }
    case SET_PORTAL_SESSION_URL_ACTION:
      return {
        ...state,
        portalSessionURL: payload
      }
    default:
      return state;
  }
}