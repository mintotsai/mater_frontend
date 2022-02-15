import { GET_USER_ACTION, UPDATE_USER_SUCCESS_ACTION } from './actions'
import initialState from './state'

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_ACTION:
      return {}
    case UPDATE_USER_SUCCESS_ACTION:
      return {
        ...state,
        user: payload,
      };
    default:
      return state
  }
}
export default userReducer