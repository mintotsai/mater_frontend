import { PROVIDER_GET_PATIENTS_SUCCESS_ACTION } from './actions';
import initialState from './state';

const providerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROVIDER_GET_PATIENTS_SUCCESS_ACTION:
      return {
        ...state,
        providerAllPatients: payload
      }
    default:
      return state
  }
}
export default providerReducer
