import AuthService from "../../services/auth.service";
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../system/actions";

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

export const login = (payload) => (dispatch) => {
  return AuthService.login(payload).then(
    (data) => {
      if (data && data.data && data.data.attributes.otp_required_for_login) {
        dispatch({
          type: SHOW_OTP_ACTION,
          payload: { user: data.data, showOTPScreen: true }
        });
        dispatch({
          type: SET_GOTO_URL_ACTION,
          payload: "/verify",
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS_ACTION,
          payload: data.data,
        });
        dispatch({
          type: SET_MESSAGE_ACTION,
          payload: { message: null, messageState: "" },
        });
        dispatch({
          type: SET_GOTO_URL_ACTION,
          payload: "/home",
        });
      }

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL_ACTION,
      });
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const verify = (payload) => (dispatch) => {
  return AuthService.login(payload).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS_ACTION,
        payload: data.data,
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: VERIFY_FAIL_ACTION,
      });
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  dispatch({
    type: SET_MESSAGE_ACTION,
    payload: { message: null, messageState: "" },
  });
  dispatch({
    type: SET_GOTO_URL_ACTION,
    payload: ""
  });
  return AuthService.logout().then(
    (data) => {
      dispatch({
        type: LOGOUT_ACTION,
      })

      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: "/login"
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

export const signup = (payload) => (dispatch) => {
  return AuthService.signup(payload).then(
    (data) => {
      dispatch({
        type: SIGNUP_SUCCESS_ACTION,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SIGNUP_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const forgot = (payload) => (dispatch) => {
  return AuthService.forgot(payload).then(
    (data) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS_ACTION,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: FORGOT_PASSWORD_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const reset = (payload) => (dispatch) => {
  return AuthService.reset(payload).then(
    (data) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS_ACTION,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: RESET_PASSWORD_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      return Promise.reject();
    }
  );
};

export const confirmation = (payload) => (dispatch) => {
  return AuthService.confirmation(payload).then(
    (data) => {
      dispatch({
        type: CONFIRMATION_SUCCESS_ACTION,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: CONFIRMATION_FAIL_ACTION,
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

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

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: { message: { title: "Successfully, changed your password.", detail: "" }, messageStatus: "success" },
      });

      return Promise.resolve();
    },
    (error) => {
      // dispatch({
      //   type: UPDATE_PASSWORD_FAIL_ACTION,
      // });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
      });

      // TODO: Whats the right thing to do here?
      // return Promise.reject();
      return Promise.resolve();
    }
  );
};