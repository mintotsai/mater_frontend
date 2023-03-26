import { setMessage } from "../../helpers/messages";
import ProviderPatientService from "../../services/provider/provider.patient.service";
import { SET_LOADING_ACTION } from "../system/actions";

export const PROVIDER_GET_PATIENTS_ACTION = "PROVIDER_GET_PATIENTS_ACTION";
export const PROVIDER_GET_PATIENTS_SUCCESS_ACTION = "PROVIDER_GET_PATIENTS_SUCCESS_ACTION";
export const PROVIDER_CREATE_PATIENT_ACTION = "PROVIDER_CREATE_PATIENT_ACTION";
export const PROVIDER_CREATE_PATIENT_SUCCESS_ACTION = "PROVIDER_CREATE_PATIENT_SUCCESS_ACTION";

export const getPatients = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_GET_PATIENTS_ACTION,
  });
  return ProviderPatientService.getPatients().then(
    (data) => {
      Promise.all([
        dispatch({
          type: PROVIDER_GET_PATIENTS_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_GET_PATIENTS_ACTION,
        }),
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_GET_PATIENTS_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  )
}

export const createPatient = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_CREATE_PATIENT_ACTION,
  });
  return ProviderPatientService.createPatient(payload).then(
    (data) => {
      let messages = [{ title: "Successfully added patient.", detail: "Successfully added patient." }];
      Promise.all([
        dispatch({
          type: PROVIDER_CREATE_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_CREATE_PATIENT_ACTION,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_CREATE_PATIENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  )
}