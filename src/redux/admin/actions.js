import AdminUserService from "../../services/admin/admin.user.service";
import { setMessage } from "../../helpers/messages";

export const ADMIN_GET_USERS_SUCCESS_ACTION = "ADMIN_GET_USERS_SUCCESS_ACTION";

export const getUsers = (userId) => (dispatch) => {
  return AdminUserService.getUsers(userId).then(
    (data) => {
      console.log(">>>data");
      console.log({ data });

      Promise.all([
        dispatch({
          type: ADMIN_GET_USERS_SUCCESS_ACTION,
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