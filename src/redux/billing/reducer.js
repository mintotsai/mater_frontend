import { SET_CARD_INFO_ACTION, SET_SETUP_SECRET, SET_BILLING_HISTORY, SET_SUBSCRIPTION } from "./actions";
import initialState from "./state"

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CARD_INFO_ACTION:
      return {
        ...state,
        cardInfo: payload
      };
    case SET_SETUP_SECRET:
      return {
        ...state,
        setupSecret: payload
      };
    case SET_BILLING_HISTORY:
      return {
        ...state,
        billingHistory: payload
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: payload
      }
    default:
      return state;
  }
}