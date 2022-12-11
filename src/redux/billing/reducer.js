import { SET_CARD_INFO_ACTION, SET_SETUP_SECRET } from "./actions";
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
    default:
      return state;
  }
}