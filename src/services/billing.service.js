import { client } from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const createCheckoutSession = async (payload) => {
  return client.post(
    `api/v1/billings/create-checkout-session`,
    payload,
    { authorization: true }
  )
}

const createPortalSession = async (payload) => {
  return client.post(
    `api/v1/billings/create-portal-session`,
    payload,
    { authorization: true }
  )
}

export default {
  createCheckoutSession,
  createPortalSession,
};