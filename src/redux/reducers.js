import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import adminUserReducer from "./admin/reducer";
import { LOGOUT_ACTION } from "./auth/actions";
import authReducer from './auth/reducer';
import billingReducer from './billing/reducer';
import providerReducer from "./provider/reducer";
import systemReducer from './system/reducer';
import userReducer from './user/reducer';

const appReducer = combineReducers({
  system: systemReducer,
  auth: authReducer,
  user: userReducer,
  billing: billingReducer,
  adminUser: adminUserReducer,
  providerUser: providerReducer,
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