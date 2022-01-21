import { SET_MESSAGE_ACTION } from "./actions";
import initialState from "./state"

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE_ACTION:
      return {
        ...state,
        message: payload,
      };
    default:
      return state;
  }
}