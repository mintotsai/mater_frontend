import UserService from "../../services/user.service";
import { SET_MESSAGE_ACTION } from "../system/actions";

export const GET_USER_ACTION = "GET_USER_ACTION"
export const UPDATE_USER_ACTION = "UPDATE_USER_ACTION"

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

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updateUser = (userId, payload) => (dispatch) => {
  return UserService.updateUser(userId, payload).then(

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

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};