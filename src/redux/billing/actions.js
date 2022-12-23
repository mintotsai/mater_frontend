import BillingService from "../../services/billing.service";
import { SET_MESSAGE_ACTION, SET_GOTO_URL_ACTION } from "../system/actions";
import { logout } from "../../redux/auth/actions";
export const CREATE_CHECKOUT_SESSION = "CREATE_CHECKOUT_SESSION"
export const SET_CARD_INFO_ACTION = "SET_CARD_INFO_ACTION"
export const SET_SETUP_SECRET = "SET_SETUP_SECRET"
export const SET_BILLING_HISTORY = "SET_BILLING_HISTORY"

export const createSubscription = (payload) => (dispatch) => {
  return BillingService.createSubscription(payload).then(

    (data) => {
      // console.log(data);

      dispatch({
        type: SET_GOTO_URL_ACTION,
        payload: "/settings/account#billing",
      });

      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: { message: [{ title: "Successfully, subscribed." }], messageStatus: "success" },
      });

      return Promise.resolve();
    },
    (error) => {
      if (error.response.status == 401) dispatch(logout());
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

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

export const getCreditCardInfo = (payload) => (dispatch) => {
  return BillingService.getCreditCardInfo(payload).then(

    (data) => {
      // console.log(data);

      dispatch({
        type: SET_CARD_INFO_ACTION,
        payload: data.data,
      })

      return Promise.resolve();
    },
    (error) => {
      if (error.response.status == 401) dispatch(logout());
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // TODO: Fix this?
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getSetupSecret = (payload) => (dispatch) => {
  return BillingService.getSetupSecret(payload).then(
    (data) => {
      dispatch({
        type: SET_SETUP_SECRET,
        payload: data.data.client_secret,
      })
      // dispatch({
      //   type: SET_CARD_INFO_ACTION,
      //   payload: data.data,
      // })

      return Promise.resolve();
    },
    (error) => {
      if (error.response.status == 401) dispatch(logout());
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // TODO: Fix this?
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// export const updateCreditCardInfo = (payload) => (dispatch) => {
//   return BillingService.updateCreditCardInfo(payload).then(

//     (data) => {
//       // console.log(data);

//       // dispatch({
//       //   type: SET_GOTO_URL_ACTION,
//       //   payload: "/settings/account#billing",
//       // });

//       // dispatch({
//       //   type: SET_MESSAGE_ACTION,
//       //   payload: { message: [{ title: "Successfully, subscribed." }], messageStatus: "success" },
//       // });

//       return Promise.resolve();
//     },
//     (error) => {
//       if (error.response.status == 401) dispatch(logout());
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       // TODO: Fix this?
//       dispatch({
//         type: SET_MESSAGE_ACTION,
//         payload: message,
//       });
//       // dispatch({
//       //   type: SET_MESSAGE_ACTION,
//       //   payload: error.response.data.errors ? { message: error.response.data.errors, messageStatus: "error" } : { message: [{ title: error.response.data.error }], messageStatus: "error" },
//       // });

//       return Promise.reject();
//     }
//   );
// };

export const setDefaultPaymentMethod = (payload) => (dispatch) => {
  return BillingService.setDefaultPaymentMethod(payload).then(

    (data) => {
      // console.log(data);

      // dispatch({
      //   type: SET_GOTO_URL_ACTION,
      //   payload: "/settings/account#billing",
      // });

      // dispatch({
      //   type: SET_MESSAGE_ACTION,
      //   payload: { message: [{ title: "Successfully, subscribed." }], messageStatus: "success" },
      // });

      return Promise.resolve();
    },
    (error) => {
      if (error.response.status == 401) dispatch(logout());
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

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

export const getBillingHistory = (payload) => (dispatch) => {
  return BillingService.getBillingHistory(payload).then(

    (data) => {
      // console.log(data);

      dispatch({
        type: SET_BILLING_HISTORY,
        payload: data.data,
      })

      return Promise.resolve();
    },
    (error) => {
      if (error.response.status == 401) dispatch(logout());
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // TODO: Fix this?
      dispatch({
        type: SET_MESSAGE_ACTION,
        payload: message,
      });

      return Promise.reject();
    }
  );
};