import AuthService from "../../services/auth.service";
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../system/actions";
import { setMessage, clearMessage } from "../../helpers/messages";

export const LOGIN_ACTION = "LOGIN_ACTION"
export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION"
export const LOGIN_FAIL_ACTION = "LOGIN_FAIL_ACTION"
export const VERIFY_FAIL_ACTION = "VERIFY_FAIL_ACTION"
export const SHOW_OTP_ACTION = "SHOW_OTP_ACTION"
export const LOGOUT_ACTION = "LOGOUT_ACTION"
export const SIGNUP_SUCCESS_ACTION = "SIGNUP_SUCCESS_ACTION"
export const SIGNUP_FAIL_ACTION = "SIGNUP_FAIL_ACTION"
export const FORGOT_PASSWORD_SUCCESS_ACTION = "FORGOT_PASSWORD_SUCCESS_ACTION"
export const FORGOT_PASSWORD_FAIL_ACTION = "FORGOT_PASSWORD_FAIL_ACTION"
export const RESET_PASSWORD_SUCCESS_ACTION = "RESET_PASSWORD_SUCCESS_ACTION"
export const RESET_PASSWORD_FAIL_ACTION = "RESET_PASSWORD_FAIL_ACTION"
export const CONFIRMATION_SUCCESS_ACTION = "CONFIRMATION_SUCCESS_ACTION"
export const CONFIRMATION_FAIL_ACTION = "CONFIRMATION_FAIL_ACTION"
export const UPDATE_PASSWORD_SUCCESS_ACTION = "UPDATE_PASSWORD_SUCCESS_ACTION"
export const UPDATE_PASSWORD_FAIL_ACTION = "UPDATE_PASSWORD_FAIL_ACTION"
export const UPDATE_USER_ACTION = "UPDATE_USER_ACTION"
export const UPDATE_USER_SUCCESS_ACTION = "UPDATE_USER_SUCCESS_ACTION"
export const UPDATE_USER_FAIL_ACTION = "UPDATE_USER_FAIL_ACTION"

export const login = (payload, navigate) => (dispatch) => {
  return AuthService.login(payload).then(
    (data) => {
      if (data && data.data && data.data.attributes.otp_required_for_login) {
        Promise.all([
          dispatch({
            type: SHOW_OTP_ACTION,
            payload: { user: data.data, showOTPScreen: true }
          }),
          clearMessage(dispatch),
          navigate("/verify")
        ]);
      } else {
        Promise.all([
          dispatch({
            type: LOGIN_SUCCESS_ACTION,
            payload: data.data,
          }),
          clearMessage(dispatch),
          navigate("/home")
        ]);
      }

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: LOGIN_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const verify = (payload, navigate) => (dispatch) => {
  return AuthService.login(payload).then(
    (data) => {
      Promise.all([
        dispatch({
          type: LOGIN_SUCCESS_ACTION,
          payload: data.data,
        }),
        navigate("/home")
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: VERIFY_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const logout = (navigate) => (dispatch) => {
  return AuthService.logout().then(
    (data) => {
      Promise.all([
        dispatch({
          type: LOGOUT_ACTION,
        }),
        navigate("/login")
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const signup = (payload) => (dispatch) => {
  return AuthService.signup(payload).then(
    (data) => {
      var messages = [{ title: "Check your email to confirm your account." }];
      Promise.all([
        dispatch({
          type: SIGNUP_SUCCESS_ACTION,
          payload: { user: data },
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: SIGNUP_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const forgot = (payload) => (dispatch) => {
  return AuthService.forgot(payload).then(
    (data) => {
      var messages = [{ title: "Password reset email has been sent." }];
      Promise.all([
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS_ACTION,
          payload: { user: data },
        }),
        setMessage(dispatch, "success", messages)
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: FORGOT_PASSWORD_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const reset = (navigate, payload) => (dispatch) => {
  // clearMessage(dispatch);
  return AuthService.reset(payload).then(
    (data) => {
      Promise.all([
        dispatch({
          type: RESET_PASSWORD_SUCCESS_ACTION,
          payload: { user: data },
        }),
        navigate("/login")
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: RESET_PASSWORD_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const confirmation = (navigate, payload) => (dispatch) => {
  return AuthService.confirmation(payload).then(
    (data) => {
      Promise.all([
        dispatch({
          type: CONFIRMATION_SUCCESS_ACTION,
          payload: { user: data },
        }),
        navigate("/login")
      ]);

      return Promise.resolve();
    },
    (error) => {
      // TODO: Maybe we don't need this error message
      var messages = error.response.data;
      Promise.all([
        dispatch({
          type: CONFIRMATION_FAIL_ACTION,
        }),
        setMessage(dispatch, "error", messages),
      ]);

      return Promise.reject();
    }
  );
};

export const updatePassword = (payload) => (dispatch) => {
  return AuthService.updatePassword(payload).then(
    (data) => {
      // dispatch({
      //   type: UPDATE_PASSWORD_SUCCESS_ACTION,
      // });
      var messages = [{ title: "Successfully, changed your password." }];
      Promise.all([
        setMessage(dispatch, "success", messages),
      ]);

      return Promise.resolve();
    },
    (error) => {
      var messages = error.response.data;
      Promise.all([
        setMessage(dispatch, "error", messages),
      ]);

      // TODO: Whats the right thing to do here?
      // return Promise.reject();
      return Promise.resolve();
    }
  );
};