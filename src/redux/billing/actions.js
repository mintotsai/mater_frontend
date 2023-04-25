import { setMessage } from "../../helpers/messages";
import BillingService from "../../services/billing.service";

export const SET_CHECKOUT_SESSION_URL_ACTION = "SET_CHECKOUT_SESSION_URL_ACTION";
export const SET_PORTAL_SESSION_URL_ACTION = "SET_PORTAL_SESSION_URL_ACTION";

export const createCheckoutSession = (payload) => (dispatch) => {
  return BillingService.createCheckoutSession(payload).then(
    (data) => {
      Promise.all([
        dispatch({
          type: SET_CHECKOUT_SESSION_URL_ACTION,
          payload: data.data.data.attributes.data.url,
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
  )
}

export const createPortalSession = (payload) => (dispatch) => {
  return BillingService.createPortalSession(payload).then(
    (data) => {
      console.log(">>>" + JSON.stringify(data));
      console.log(data);
      Promise.all([
        dispatch({
          type: SET_PORTAL_SESSION_URL_ACTION,
          payload: data.data.data.attributes.data.url,
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
  )
}