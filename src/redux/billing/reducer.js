import { SET_CARD_INFO_ACTION } from "./actions";
import initialState from "./state"

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CARD_INFO_ACTION:
      return {
        ...state,
        cardInfo: payload
      };
    default:
      return state;
  }
}