import AdminUserService from "../../services/admin/admin.user.service";
import { setMessage } from "../../helpers/messages";

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