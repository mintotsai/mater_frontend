import UserService from "../../services/user.service";
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../system/actions";
import { UPDATE_USER_ACTION, UPDATE_USER_SUCCESS_ACTION, UPDATE_USER_FAIL_ACTION } from "../auth/actions";

export const GET_USER_ACTION = "GET_USER_ACTION"
export const GET_QR_CODE_URI_SUCCESS_ACTION = "GET_QR_CODE_URI_SUCCESS_ACTION"
export const GET_QR_CODE_URI_FAIL_ACTION = "GET_QR_CODE_URI_FAIL_ACTION"
export const GET_PRESIGNED_URL_SUCCESS_ACTION = "GET_PRESIGNED_URL_SUCCESS_ACTION"

export const getUser = (userId) => (dispatch) => {
  return UserService.getUser(userId).then(

    (data) => {
      console.log(data);
      // dispatch({
      //   type: LOGIN_SUCCESS_ACTION,
      //   payload: data,
      // });

      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: LOGIN_FAIL_ACTION,
      // });

      // TODO: Fix this?
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });
      // dispatch({
      //   type: SET_MESSAGE_ACTION,
      //   payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      // });

      return Promise.reject();
    }
  );
};

export const updateUser = (userId, payload) => (dispatch) => {
  return UserService.updateUser(userId, payload).then(

    (data) => {
      dispatch({
        type: UPDATE_USER_SUCCESS_ACTION,
        payload: data.data.data,
      });
      // TODO: Do we need this?
      // localStorage.setItem("user", JSON.stringify(data.data));

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: UPDATE_USER_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const enableMFA = () => (dispatch) => {
  dispatch({
    type: SET_GOTO_URL_ACTION,
    payload: ""
  });
  dispatch({
    type: SET_MESSAGE_ACTION,
    payload: { message: null, messageState: "" },
  });

  return UserService.enableMFA().then(
    (data) => {

      dispatch({
        type: UPDATE_USER_SUCCESS_ACTION,
        payload: data.data.data,
      });

      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: "/settings/account/2fasetup"
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const getQRCodeUri = () => (dispatch) => {
  return UserService.getQRCodeUri().then(
    (data) => {
      dispatch({
        type: GET_QR_CODE_URI_SUCCESS_ACTION,
        payload: data.data,
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GET_QR_CODE_URI_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const confirmMFA = (payload) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE_ACTION,
    payload: { message: null, messageState: "" },
  });
  return UserService.confirmMFA(payload).then(
    (data) => {
      dispatch({
        type: UPDATE_USER_SUCCESS_ACTION,
        payload: data.data.data,
      });

      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: "/settings/account"
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: { message: [{ title: "Successfully, setup MFA." }], messageStatus: "success" },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: "/settings/account"
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const disableMFA = (userId) => (dispatch) => {
  dispatch({
    type: SET_MESSAGE_ACTION,
    payload: { message: null, messageState: "" },
  });
  return UserService.disableMFA(userId).then(
    (data) => {
      dispatch({
        type: UPDATE_USER_SUCCESS_ACTION,
        payload: data.data.data,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: { message: [{ title: "Successfully disabled two factor authentication." }], messageStatus: "success" },
      });

      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const createPresignedUrl = (file, payload) => (dispatch, getState) => {
  return UserService.createPresignedUrl(payload).then(
    (data) => {
      dispatch({
        type: GET_PRESIGNED_URL_SUCCESS_ACTION,
        payload: data.data,
      });

      const { auth, user } = getState();

      return Promise.resolve(dispatch(directUpload(user.directUploadUrl, file)))
        .then(
          () => dispatch(updateUser(auth.user.id, { user: { png: user.blobSignedId } }))
        );
    },
    (error) => {
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

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
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};