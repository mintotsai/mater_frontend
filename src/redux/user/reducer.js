import { LOGIN_ACTION, LOGOUT_ACTION } from './actions'
import initialState from './state'

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...state, user: action.payload, loggedIn: true }
    case LOGOUT_ACTION:
      // TODO: firstState?
      return {}
    default:
      return state
  }
}
export default userReducer