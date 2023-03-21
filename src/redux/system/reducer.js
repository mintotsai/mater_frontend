import { SET_GOTO_URL_ACTION, SET_LOADING_ACTION, SET_MESSAGE_ACTION } from "./actions";
import initialState from "./state";

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
    // https://blog.adedaniel.com/an-easier-way-to-handle-loading-error-and-success-states-in-redux
    case SET_LOADING_ACTION:
      if (action.isLoading === true) {
        return {
          ...state,
          // If isLoading is true, add the loading type  to the array
          loadingActions: [...state.loadingActions, action.loadingType],
        };
      } else {
        return {
          ...state,
          // If isLoading is false, remove the loading type from the array
          loadingActions: state.loadingActions.filter(
            (eachAction) => eachAction !== action.loadingType
          ),
        };
      }
    default:
      return state;
  }
}