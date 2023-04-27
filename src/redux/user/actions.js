import { setMessage } from "../../helpers/messages";
import UserService from "../../services/user.service";
import { UPDATE_USER_FAIL_ACTION, UPDATE_USER_SUCCESS_ACTION } from "../auth/actions";

export const GET_USER_ACTION = "GET_USER_ACTION"
export const GET_QR_CODE_URI_SUCCESS_ACTION = "GET_QR_CODE_URI_SUCCESS_ACTION"
export const GET_QR_CODE_URI_FAIL_ACTION = "GET_QR_CODE_URI_FAIL_ACTION"
export const GET_PRESIGNED_URL_SUCCESS_ACTION = "GET_PRESIGNED_URL_SUCCESS_ACTION"
export const GET_NOTIFICATIONS_SUCCESS_ACTION = "GET_NOTIFICATIONS_SUCCESS_ACTION"
export const GET_NOTIFICATIONS_FAIL_ACTION = "GET_NOTIFICATIONS_FAIL_ACTION"

export const getUser = (userId) => (dispatch) => {
  return UserService.getUser(userId).then(
    (data) => {
      Promise.all([
        dispatch({
          type: UPDATE_USER_SUCCESS_ACTION,
          payload: data.data.data,
        }),
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
};

export const updateUser = (userId, payload) => (dispatch) => {
  return UserService.updateUser(userId, payload).then(
    (data) => {
      let messages = [{ title: "Successfully updated", detail: "Successfully updated" }];
      if ("png" in payload["user"]) {
        messages = [{ title: "Successfully updated profile image", detail: "Successfully updated profile image" }];
      } else if ("email" in payload["user"]) {
        messages = [{ title: "Check email to confirm email change", detail: "Check email to confirm email change" }];
      } else if ("user_profile_first_name" in payload["user"]) {
        messages = [{ title: "Successfully changed your name", detail: "Successfully changed your name" }];
      }

      // TODO: Do we need this?
      // localStorage.setItem("user", JSON.stringify(data.data));

      Promise.all([
        dispatch({
          type: UPDATE_USER_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: UPDATE_USER_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const enableMFA = () => (dispatch) => {
  // dispatch({
  //   type: SET_GOTO_URL_ACTION,
  //   payload: ""
  // });
  // dispatch({
  //   type: SET_MESSAGE_ACTION,
  //   payload: { message: null, messageState: "" },
  // });

  return UserService.enableMFA().then(
    (data) => {
      let response = {};
      Promise.all([
        dispatch({
          type: UPDATE_USER_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        // navigate("/settings/account/2fasetup")
      ]);

      response["navigateTo"] = "/settings/account/2fasetup";
      return Promise.resolve(response);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const getQRCodeUri = () => (dispatch) => {
  return UserService.getQRCodeUri().then(
    (data) => {
      dispatch({
        type: GET_QR_CODE_URI_SUCCESS_ACTION,
        payload: data.data.data.attributes.data,
      });

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: GET_QR_CODE_URI_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const confirmMFA = (payload) => (dispatch) => {
  // dispatch({
  //   type: SET_MESSAGE_ACTION,
  //   payload: { message: null, messageState: "" },
  // });
  return UserService.confirmMFA(payload).then(
    (data) => {
      let response = {};
      let messages = [{ title: "Successfully, setup MFA." }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_SUCCESS_ACTION,
          payload: data.data.data,
        }),
        setMessage(dispatch, "success", messages),
        // navigate("/settings/account")
      ]);

      response["navigateTo"] = "/settings/account";
      return Promise.resolve(response);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const disableMFA = (userId) => (dispatch) => {
  // dispatch({
  //   type: SET_MESSAGE_ACTION,
  //   payload: { message: null, messageState: "" },
  // });
  return UserService.disableMFA(userId).then(
    (data) => {
      let messages = [{ title: "Successfully disabled two factor authentication." }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_SUCCESS_ACTION,
          payload: data.data.data,
        }),
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
};

export const createPresignedUrl = (file, payload) => (dispatch, getState) => {
  return UserService.createPresignedUrl(payload).then(
    (data) => {
      dispatch({
        type: GET_PRESIGNED_URL_SUCCESS_ACTION,
        payload: data.data.data.attributes.data,
      });

      const { auth, user } = getState();

      return Promise.resolve(dispatch(directUpload(user.directUploadHeaders, user.directUploadUrl, file)))
        .then(
          () => dispatch(updateUser(auth.user.id, { user: { png: user.blobSignedId } }))
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

export const getNotifications = () => (dispatch) => {
  return UserService.getNotifications().then(
    (data) => {
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS_ACTION,
        payload: data.data.data,
      });

      return Promise.resolve();
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: GET_NOTIFICATIONS_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};