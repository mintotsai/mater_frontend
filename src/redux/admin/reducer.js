import initialState from './state'
import { ADMIN_GET_USERS_SUCCESS_ACTION } from './actions';

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_GET_USERS_SUCCESS_ACTION:
      return {
        ...state,
        adminAllUsers: payload
      }
    default:
      return state
  }
}
export default userReducer
