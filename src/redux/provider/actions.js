import { setMessage } from "../../helpers/messages";
import ProviderHealthMeasurementService from "../../services/provider/provider.health.measurement.service";
import ProviderPatientService from "../../services/provider/provider.patient.service";
import UserService from "../../services/user.service";
import { SET_LOADING_ACTION } from "../system/actions";

export const PROVIDER_GET_PATIENTS_ACTION = "PROVIDER_GET_PATIENTS_ACTION";
export const PROVIDER_GET_PATIENTS_SUCCESS_ACTION = "PROVIDER_GET_PATIENTS_SUCCESS_ACTION";
export const PROVIDER_GET_PATIENT_ACTION = "PROVIDER_GET_PATIENT_ACTION";
export const PROVIDER_GET_PATIENT_SUCCESS_ACTION = "PROVIDER_GET_PATIENT_SUCCESS_ACTION";
export const PROVIDER_CREATE_PATIENT_ACTION = "PROVIDER_CREATE_PATIENT_ACTION";
export const PROVIDER_CREATE_PATIENT_SUCCESS_ACTION = "PROVIDER_CREATE_PATIENT_SUCCESS_ACTION";
export const PROVIDER_UPDATE_PATIENT_ACTION = "PROVIDER_UPDATE_PATIENT_ACTION";
export const PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION = "PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION";
export const PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION = "PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION"
export const PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION = "PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION"

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

export const getPatient = (patientId) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_GET_PATIENT_ACTION,
  });
  return ProviderPatientService.getPatient(patientId).then(
    (data) => {
      Promise.all([
        dispatch({
          type: PROVIDER_GET_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_GET_PATIENT_ACTION,
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
          loadingType: PROVIDER_GET_PATIENT_ACTION,
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

export const updatePatient = (userId, payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_UPDATE_PATIENT_ACTION,
  });
  return ProviderPatientService.updatePatient(userId, payload).then(
    (data) => {
      let messages = [{ title: "Successfully updated", detail: "Successfully updated" }];

      Promise.all([
        dispatch({
          type: PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_UPDATE_PATIENT_ACTION,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_UPDATE_PATIENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const createPresignedUrl = (file, payload) => (dispatch, getState) => {
  return UserService.createPresignedUrl(payload).then(
    (data) => {
      dispatch({
        type: PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION,
        payload: data.data.data.attributes.data,
      });

      const { providerUser } = getState();

      return Promise.resolve(dispatch(directUpload(providerUser.providerSelectedPatient.directUploadUrl, file)))
        .then(
          () => dispatch(updatePatient(providerUser.providerSelectedPatient.id, { user: { png: providerUser.providerSelectedPatient.blobSignedId } }))
        ).catch((error) => {
          setMessage(dispatch, "error", error);
        });
    },
    (error) => {
      let messages = error.response.data;
      setMessage(dispatch, "error", messages);

      return Promise.reject();
    }
  );
};

export const directUpload = (directUploadUrl, payload) => (dispatch) => {
  return UserService.directUpload(directUploadUrl, payload).then(
    (data) => {

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      setMessage(dispatch, "error", messages);

      return Promise.reject(messages);
    }
  );
};

export const deleteHealthMeasurement = (id) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION,
  });
  return ProviderHealthMeasurementService.deleteHealthMeasurement(id).then(
    (data) => {
      let messages = [{ title: "Successfully deleted", detail: "Successfully deleted" }];

      Promise.all([
        dispatch({
          type: PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};