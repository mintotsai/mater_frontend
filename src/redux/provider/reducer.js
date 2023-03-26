import { PROVIDER_CREATE_PATIENT_SUCCESS_ACTION, PROVIDER_GET_PATIENTS_SUCCESS_ACTION, PROVIDER_GET_PATIENT_SUCCESS_ACTION } from './actions';
import initialState from './state';

const providerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PROVIDER_GET_PATIENTS_SUCCESS_ACTION:
      return {
        ...state,
        providerAllPatients: payload
      }
    case PROVIDER_GET_PATIENT_SUCCESS_ACTION:
      return {
        ...state,
        providerSelectedPatient: payload
      }
    case PROVIDER_CREATE_PATIENT_SUCCESS_ACTION:
      return {
        ...state,
        providerSelectedPatient: payload
      }
    default:
      return state
  }
}
export default providerReducer
