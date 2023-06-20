import { setMessage } from "../../helpers/messages";
import ProviderEventService from "../../services/provider/provider.event.service";
import ProviderHealthMeasurementService from "../../services/provider/provider.health.measurement.service";
import ProviderMedicationService from "../../services/provider/provider.medication.service";
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
export const PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION = "PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION";
export const PROVIDER_UPDATE_HEALTH_MEASUREMENT_ACTION = "PROVIDER_UPDATE_HEALTH_MEASUREMENT_ACTION";
export const PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION = "PROVIDER_DELETE_HEALTH_MEASUREMENT_ACTION";
export const PROVIDER_BLOOD_PRESSURE_MEASUREMENTS_TO_PRINT_ACTION = "PROVIDER_BLOOD_PRESSURE_MEASUREMENTS_TO_PRINT_ACTION";
export const PROVIDER_CREATE_EVENT_ACTION = "PROVIDER_CREATE_EVENT_ACTION";
export const PROVIDER_GET_EVENTS_SUCCESS_ACTION = "PROVIDER_GET_EVENTS_SUCCESS_ACTION";
export const PROVIDER_DELETE_EVENT_ACTION = "PROVIDER_DELETE_EVENT_ACTION";
export const PROVIDER_UPDATE_EVENT_ACTION = "PROVIDER_UPDATE_EVENT_ACTION";
export const PROVIDER_CREATE_MEDICATION_LIST_ACTION = "PROVIDER_CREATE_MEDICATION_LIST_ACTION";
export const PROVIDER_DELETE_MEDICATION_LIST_ACTION = "PROVIDER_DELETE_MEDICATION_LIST_ACTION";
export const PROVIDER_GET_MEDICATIONS_ACTION = "PROVIDER_GET_MEDICATIONS_ACTION";
export const PROVIDER_GET_MEDICATIONS_SUCCESS_ACTION = "PROVIDER_GET_MEDICATIONS_SUCCESS_ACTION";
export const PROVIDER_GET_DATA_EXPORT_DOWNLOAD_URL_SUCCESS_ACTION = "PROVIDER_GET_DATA_EXPORT_DOWNLOAD_URL_SUCCESS_ACTION";

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

      return Promise.resolve(dispatch(directUpload(providerUser.providerSelectedPatient.directUploadHeaders, providerUser.providerSelectedPatient.directUploadUrl, file)))
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

export const uploadCSV = (file, payload) => (dispatch, getState) => {
  return UserService.createPresignedUrl(payload).then(
    (data) => {
      dispatch({
        type: PROVIDER_GET_PRESIGNED_URL_SUCCESS_ACTION,
        payload: data.data.data.attributes.data,
      });

      const { providerUser } = getState();

      return Promise.resolve(dispatch(directUpload(providerUser.providerSelectedPatient.directUploadHeaders, providerUser.providerSelectedPatient.directUploadUrl, file))).then(
        () => dispatch(dataImport({ file: providerUser.providerSelectedPatient.blobSignedId, patientId: payload.patientId }))
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

export const dataExport = (payload) => (dispatch) => {
  return UserService.dataExport(payload).then(
    (data) => {
      let messages = [{ title: "Successfully submitted export", detail: "Successfully submitted export" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
}

export const dataExportDownload = (csvId) => (dispatch) => {
  return UserService.dataExportDownload(csvId).then(
    (data) => {

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
}

export const dataImport = (payload) => (dispatch) => {
  return UserService.dataImport(payload).then(
    (data) => {
      let messages = [{ title: "Successfully updated", detail: "Successfully updated" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
}

export const directUpload = (directUploadUrl, payload, directUploadHeaders) => (dispatch) => {
  return UserService.directUpload(directUploadUrl, payload, directUploadHeaders).then(
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

export const updateHealthMeasurement = (id, payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_UPDATE_HEALTH_MEASUREMENT_ACTION,
  });
  return ProviderHealthMeasurementService.updateHealthMeasurement(id, payload).then(
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
          loadingType: PROVIDER_UPDATE_HEALTH_MEASUREMENT_ACTION,
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
          loadingType: PROVIDER_UPDATE_HEALTH_MEASUREMENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
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

export const createEvent = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_CREATE_EVENT_ACTION,
  });
  return ProviderEventService.createEvent(payload).then(
    (data) => {
      let messages = [{ title: "Successfully created event", detail: "Successfully created event" }];

      Promise.all([
        dispatch({
          type: PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_CREATE_EVENT_ACTION,
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
          loadingType: PROVIDER_CREATE_EVENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const deleteEvent = (id) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_DELETE_EVENT_ACTION,
  });
  return ProviderEventService.deleteEvent(id).then(
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
          loadingType: PROVIDER_DELETE_EVENT_ACTION,
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
          loadingType: PROVIDER_DELETE_EVENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const updateEvent = (id, payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_UPDATE_EVENT_ACTION,
  });
  return ProviderEventService.updateEvent(id, payload).then(
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
          loadingType: PROVIDER_UPDATE_EVENT_ACTION,
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
          loadingType: PROVIDER_UPDATE_EVENT_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const createMedicationList = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_CREATE_MEDICATION_LIST_ACTION,
  });
  return ProviderMedicationService.createMedicationList(payload).then(
    (data) => {
      let messages = [{ title: "Successfully created event", detail: "Successfully created event" }];

      Promise.all([
        dispatch({
          type: PROVIDER_UPDATE_PATIENT_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_CREATE_MEDICATION_LIST_ACTION,
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
          loadingType: PROVIDER_CREATE_MEDICATION_LIST_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const deleteMedicationList = (id) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_DELETE_MEDICATION_LIST_ACTION,
  });
  return ProviderMedicationService.deleteMedicationList(id).then(
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
          loadingType: PROVIDER_DELETE_MEDICATION_LIST_ACTION,
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
          loadingType: PROVIDER_DELETE_MEDICATION_LIST_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const getMedications = () => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: PROVIDER_GET_MEDICATIONS_ACTION,
  });
  return ProviderMedicationService.getMedications().then(
    (data) => {
      Promise.all([
        dispatch({
          type: PROVIDER_GET_MEDICATIONS_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: PROVIDER_GET_MEDICATIONS_ACTION,
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
          loadingType: PROVIDER_GET_MEDICATIONS_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  )
}