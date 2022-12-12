import axios from 'axios';
import { authHeader } from "../helpers/auth.header";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const createSubscription = async (payload) => {
  return axios.post(`${BASE_URL}api/v1/billings/create-subscription`, payload, { headers: authHeader() });
};

const getCreditCardInfo = async (payload) => {
  return axios.get(`${BASE_URL}api/v1/billings/get-credit-card-info`, { headers: authHeader() });
};

const getSetupSecret = async (payload) => {
  return axios.get(`${BASE_URL}api/v1/billings/setup-secret`, { headers: authHeader() });
};

// const updateCreditCardInfo = async (payload) => {
//   return axios.post(`${BASE_URL}api/v1/billings/update-credit-card-info`, payload, { headers: authHeader() });
// };

const setDefaultPaymentMethod = async (payload) => {
  return axios.post(`${BASE_URL}api/v1/billings/set-default-payment-method`, payload, { headers: authHeader() });
};

const getBillingHistory = async (payload) => {
  return axios.get(`${BASE_URL}api/v1/billings/get-billing-history`, { headers: authHeader() });
}


export default {
  createSubscription,
  getCreditCardInfo,
  getSetupSecret,
  // updateCreditCardInfo,
  setDefaultPaymentMethod,
  getBillingHistory
};