import AdminUserService from "../../services/admin/admin.user.service";
import { setMessage } from "../../helpers/messages";
import { UPDATE_USER_ACTION, UPDATE_TRUE_USER_ACTION } from "../auth/actions";

export const ADMIN_GET_USERS_SUCCESS_ACTION = "ADMIN_GET_USERS_SUCCESS_ACTION";

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
  return AdminUserService.impersonateUser(userId).then(
    (data) => {
      let messages = [{ title: "Successfully impersonating user", detail: "Successfully impersonating user" }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_ACTION,
          payload: data.data.data.attributes.data.current_user.data,
        }),
        dispatch({
          type: UPDATE_TRUE_USER_ACTION,
          payload: data.data.data.attributes.data.true_user.data,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      let response = {}
      response["navigateTo"] = "/home";
      response["role"] = data.data.data.attributes.data.current_user.data.attributes.role.name;

      return Promise.resolve(response);
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

export const stopImpersonatingUser = () => (dispatch) => {
  return AdminUserService.stopImpersonatingUser().then(
    (data) => {
      let messages = [{ title: "Successfully stopped impersonating user", detail: "Successfully stopped impersonating user" }];
      Promise.all([
        dispatch({
          type: UPDATE_USER_ACTION,
          payload: data.data.data.attributes.data.current_user.data,
        }),
        dispatch({
          type: UPDATE_TRUE_USER_ACTION,
          payload: data.data.data.attributes.data.true_user.data,
        }),
        setMessage(dispatch, "success", messages)
      ]);

      let response = {}
      response["navigateTo"] = "/home";
      response["role"] = data.data.data.attributes.data.current_user.data.attributes.role.name;

      return Promise.resolve(response);
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