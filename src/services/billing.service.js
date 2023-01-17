import axios from 'axios';
import { authHeader } from "../helpers/auth.header";
import { client } from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const createSubscription = async (payload) => {
  return client.post(
    `api/v1/billings/create-subscription`,
    payload,
    { authorization: true }
  );
};

const getCreditCardInfo = async (payload) => {
  return client.get(
    `api/v1/billings/get-credit-card-info`,
    payload,
    { authorization: true }
  );
};

const getSetupSecret = async (payload) => {
  return client.get(
    `api/v1/billings/setup-secret`,
    payload,
    { authorization: true }
  );
};

// const updateCreditCardInfo = async (payload) => {
//   return axios.post(`${BASE_URL}api/v1/billings/update-credit-card-info`, payload, { headers: authHeader() });
// };

const setDefaultPaymentMethod = async (payload) => {
  return client.post(
    `api/v1/billings/set-default-payment-method`,
    payload,
    { authorization: true }
  );
};

const getBillingHistory = async (payload) => {
  return client.get(
    `api/v1/billings/get-billing-history`,
    payload,
    { authorization: true }
  );
}

const getSubscription = async (payload) => {
  return client.get(
    `api/v1/billings/get-subscription`,
    payload,
    { authorization: true }
  );
}

const updateSubscription = async (payload) => {
  return client.put(
    `api/v1/billings/update-subscription`,
    payload,
    { authorization: true }
  );
}

const cancelSubscription = async (payload) => {
  return client.put(
    `api/v1/billings/cancel-subscription`,
    payload,
    { authorization: true }
  );
}


export default {
  createSubscription,
  getCreditCardInfo,
  getSetupSecret,
  // updateCreditCardInfo,
  setDefaultPaymentMethod,
  getBillingHistory,
  getSubscription,
  cancelSubscription,
  updateSubscription
};