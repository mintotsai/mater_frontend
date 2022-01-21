import AuthService from "../../services/auth.service";
import { SET_MESSAGE_ACTION } from "../system/actions";

export const LOGIN_ACTION = "LOGIN_ACTION"
export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION"
export const LOGIN_FAIL_ACTION = "LOGIN_FAIL_ACTION"
export const LOGOUT_ACTION = "LOGOUT_ACTION"
export const SIGNUP_SUCCESS_ACTION = "SIGNUP_SUCCESS_ACTION"
export const SIGNUP_FAIL_ACTION = "SIGNUP_FAIL_ACTION"
export const FORGOT_PASSWORD_SUCCESS_ACTION = "FORGOT_PASSWORD_SUCCESS_ACTION"
export const FORGOT_PASSWORD_FAIL_ACTION = "FORGOT_PASSWORD_FAIL_ACTION"
export const RESET_PASSWORD_SUCCESS_ACTION = "RESET_PASSWORD_SUCCESS_ACTION"
export const RESET_PASSWORD_FAIL_ACTION = "RESET_PASSWORD_FAIL_ACTION"
export const CONFIRMATION_SUCCESS_ACTION = "CONFIRMATION_SUCCESS_ACTION"
export const CONFIRMATION_FAIL_ACTION = "CONFIRMATION_FAIL_ACTION"

export const login = (payload) => (dispatch) => {
  console.log("login");
  console.log(payload);

  return AuthService.login(payload).then(

    (data) => {
      console.log(data);
      dispatch({
        type: LOGIN_SUCCESS_ACTION,
        payload: data,
      });

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

      dispatch({
        type: LOGIN_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = (payload) => (dispatch) => {
  console.log("logout");
  console.log(payload);

  return AuthService.logout().then(

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

export const signup = (payload) => (dispatch) => {
  console.log("signup");
  console.log(dispatch);
  return AuthService.signup(payload).then(
    (data) => {
      console.log(data);
      dispatch({
        type: SIGNUP_SUCCESS_ACTION,
        payload: { user: data },
      });

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

      dispatch({
        type: SIGNUP_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const forgot = (payload) => (dispatch) => {
  console.log("forgot");
  console.log(dispatch);
  return AuthService.forgot(payload).then(
    (data) => {
      console.log(data);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS_ACTION,
        payload: { user: data },
      });

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

      dispatch({
        type: FORGOT_PASSWORD_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const reset = (payload) => (dispatch) => {
  console.log("reset");
  console.log(dispatch);
  return AuthService.reset(payload).then(
    (data) => {
      console.log(data);
      dispatch({
        type: RESET_PASSWORD_SUCCESS_ACTION,
        payload: { user: data },
      });

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

      dispatch({
        type: RESET_PASSWORD_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const confirmation = (payload) => (dispatch) => {
  console.log("confirmation");
  console.log(dispatch);
  return AuthService.confirmation(payload).then(
    (data) => {
      console.log(data);
      dispatch({
        type: CONFIRMATION_SUCCESS_ACTION,
        payload: { user: data },
      });

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

      dispatch({
        type: CONFIRMATION_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};