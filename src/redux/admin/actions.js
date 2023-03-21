import { setMessage } from "../../helpers/messages";
import AdminUserService from "../../services/admin/admin.user.service";
import { UPDATE_TRUE_USER_ACTION, UPDATE_USER_ACTION } from "../auth/actions";
import { SET_LOADING_ACTION } from "../system/actions";

export const ADMIN_GET_USERS_SUCCESS_ACTION = "ADMIN_GET_USERS_SUCCESS_ACTION";
export const ADMIN_IMPERSONATING_USER_ACTION = "ADMIN_IMPERSONATING_USER_ACTION";
export const ADMIN_STOP_IMPERSONATING_USER_ACTION = "ADMIN_STOP_IMPERSONATING_USER_ACTION";

export const getUsers = (userId) => (dispatch) => {
  return AdminUserService.getUsers(userId).then(
    (data) => {

      Promise.all([
        dispatch({
          type: ADMIN_GET_USERS_SUCCESS_ACTION,
          payload: data.data.data,
        }),
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const updateUser = (userId, payload) => (dispatch) => {
  return AdminUserService.updateUser(userId, payload).then(
    (data) => {
      let messages = [{ title: "Successfully updated", detail: "Successfully updated" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const discardUser = (userId) => (dispatch) => {
  return AdminUserService.discardUser(userId).then(
    (data) => {
      let messages = [{ title: "Successfully discarded user", detail: "Successfully discarded user" }];
      if (!data.data.data.attributes.discarded)
        messages = [{ title: "Successfully undiscarded user", detail: "Successfully undiscarded user" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const lockUser = (userId) => (dispatch) => {
  return AdminUserService.lockUser(userId).then(
    (data) => {
      let messages = [{ title: "Successfully locked user", detail: "Successfully locked user" }];
      if (!data.data.data.attributes.locked)
        messages = [{ title: "Successfully unlocked user", detail: "Successfully unlocked user" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const deactivateUser = (userId) => (dispatch) => {
  return AdminUserService.deactivateUser(userId).then(
    (data) => {
      let messages = [{ title: "Successfully deactivated user", detail: "Successfully deactivated user" }];
      if (!data.data.data.attributes.deactivated)
        messages = [{ title: "Successfully activated user", detail: "Successfully activated user" }];

      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const impersonateUser = (userId) => (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: ADMIN_IMPERSONATING_USER_ACTION,
  });
  return AdminUserService.impersonateUser(userId).then(
    (data) => {
      let messages = [{ title: "Successfully impersonating user", detail: "Successfully impersonating user" }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_ACTION,
          payload: data.data.attributes.data.current_user_data.current_user.data,
        }),
        dispatch({
          type: UPDATE_TRUE_USER_ACTION,
          payload: data.data.attributes.data.true_user_data,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: ADMIN_IMPERSONATING_USER_ACTION,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      let response = {}
      response["navigateTo"] = "/home";
      response["roles"] = data.data.attributes.data.current_user_data.current_user.data.attributes.roles;

      return Promise.resolve(response);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: ADMIN_IMPERSONATING_USER_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const stopImpersonatingUser = () => (dispatch, getState) => {
  dispatch({
    type: SET_LOADING_ACTION,
    isLoading: true,
    loadingType: ADMIN_STOP_IMPERSONATING_USER_ACTION,
  });
  return AdminUserService.stopImpersonatingUser().then(
    (data) => {
      const authToken = getState().auth.trueUser.true_user_jwt;
      localStorage.setItem('authToken', authToken);

      let messages = [{ title: "Successfully stopped impersonating user", detail: "Successfully stopped impersonating user" }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_ACTION,
          payload: getState().auth.trueUser.true_user.data,
        }),
        dispatch({
          type: UPDATE_TRUE_USER_ACTION,
          payload: null,
        }),
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: ADMIN_STOP_IMPERSONATING_USER_ACTION,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      let response = {}
      response["navigateTo"] = "/home";
      response["roles"] = getState().auth.user.attributes.roles;

      return Promise.resolve(response);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        dispatch({
          type: SET_LOADING_ACTION,
          isLoading: false,
          loadingType: ADMIN_STOP_IMPERSONATING_USER_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const resetUserPassword = (userId) => (dispatch) => {
  return AdminUserService.resetUserPassword(userId).then(
    (data) => {
      let messages = [{ title: "Successfully reset user password", detail: "Successfully reset user password" }];
      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};

export const disableMFA = (userId) => (dispatch) => {
  return AdminUserService.disableMFA(userId).then(
    (data) => {
      let messages = [{ title: "Successfully, disabled user MFA", detail: "Successfully, disabled user MFA" }];
      Promise.all([
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve(data);
    },
    (error) => {
      let messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject(error);
    }
  );
};