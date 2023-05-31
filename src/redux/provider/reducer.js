import {
  PROVIDER_BLOOD_PRESSURE_MEASUREMENTS_TO_PRINT_ACTION,
  PROVIDER_CREATE_PATIENT_SUCCESS_ACTION,
  PROVIDER_GET_MEDICATIONS_SUCCESS_ACTION,
  PROVIDER_GET_PATIENTS_SUCCESS_ACTION,
  PROVIDER_GET_PATIENT_SUCCESS_ACTION,
  PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION,
  PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION
} from './actions';
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
    case PROVIDER_BLOOD_PRESSURE_MEASUREMENTS_TO_PRINT_ACTION:
      return {
        ...state,
        bloodPressureMeasurementsToPrint: action.bloodPressureMeasurementsToPrint
      }
    case PROVIDER_GET_MEDICATIONS_SUCCESS_ACTION:
      return {
        ...state,
        medications: payload
      }
    default:
      return state
  }
}
export default providerReducer
