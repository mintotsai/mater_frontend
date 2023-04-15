import { PROVIDER_CREATE_PATIENT_SUCCESS_ACTION, PROVIDER_GET_PATIENTS_SUCCESS_ACTION, PROVIDER_GET_PATIENT_SUCCESS_ACTION, PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION, PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION } from './actions';
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
    case PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION:
      return {
        ...state,
        providerSelectedPatient: payload,
      };
    case PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION:
      let providerSelectedPatient = state.providerSelectedPatient;
      providerSelectedPatient["blobSignedId"] = payload.blob_signed_id;
      providerSelectedPatient["directUploadUrl"] = payload.direct_upload.url;
      providerSelectedPatient["directUploadHeaders"] = payload.direct_upload.headers;
      return {
        ...state,
        providerSelectedPatient: providerSelectedPatient
      };
    default:
      return state
  }
}
export default providerReducer
