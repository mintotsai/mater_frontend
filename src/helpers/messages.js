import { SET_MESSAGE_ACTION } from "../redux/system/actions";

export function setMessage(dispatch, type, messages) {
  if (type == "success") {
    dispatch({
      type: SET_MESSAGE_ACTION,
      payload: { message: messages, messageStatus: "success" },
    });
  } else {
    dispatch({
      type: SET_MESSAGE_ACTION,
      payload: messages.errors ? { message: messages.errors, messageStatus: "error" } : { message: [{ title: messages.error, detail: messages.error }], messageStatus: "error" },
    });
  }
}

export function clearMessage(dispatch) {
  dispatch({
    type: SET_MESSAGE_ACTION,
    payload: { message: null, messageState: "" },
  });
}