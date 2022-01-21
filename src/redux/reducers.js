import { combineReducers } from 'redux';
import systemReducer from './system/reducer'
import authReducer from './auth/reducer'
import userReducer from './user/reducer'

const rootReducer = combineReducers({
  system: systemReducer,
  auth: authReducer,
  // user: userReducer
})

export default rootReducer;