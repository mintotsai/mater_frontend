import { GET_USER_ACTION } from './actions'
import initialState from './state'

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ACTION:
      return {}
    default:
      return state
  }
}
export default userReducer