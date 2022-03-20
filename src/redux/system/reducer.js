import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "./actions";
import initialState from "./state"

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE_ACTION:
      // https://stackoverflow.com/a/58852797
      // Object.assign(state.message, payload);
      return {
        ...state,
        message: payload.message,
        messageStatus: payload.messageStatus,
      };
    case SET_GOTO_URL_ACTION:
      return {
        ...state,
        gotoUrl: payload
      };
    default:
      return state;
  }
}