import { combineReducers } from 'redux';
import systemReducer from './system/reducer'
import authReducer from './auth/reducer'
import userReducer from './user/reducer'
import billingReducer from './billing/reducer'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { LOGOUT_ACTION } from "./auth/actions";

const appReducer = combineReducers({
  system: systemReducer,
  auth: authReducer,
  user: userReducer,
  billing: billingReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_ACTION) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root')
    // storage.removeItem('persist:otherKey')

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;