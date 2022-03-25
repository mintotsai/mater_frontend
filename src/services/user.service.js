import { keyboard } from '@testing-library/user-event/dist/keyboard';
import axios from 'axios';
import { authHeader } from "../helpers/auth.header";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const getUser = async (userId) => {
  return axios.get(`${BASE_URL}api/v1/users/${userId}`, { headers: authHeader() });
};

const updateUser = async (userId, payload) => {
  return axios.put(`${BASE_URL}api/v1/users/${userId}`, payload, { headers: authHeader() });
};

const enableMFA = async () => {
  return axios.get(`${BASE_URL}api/v1/two_factor_authentication`, { headers: authHeader() });
}

const getQRCodeUri = async () => {
  return axios.get(`${BASE_URL}api/v1/two_factor_authentication/qr-code-uri`, { headers: authHeader() });
};

const confirmMFA = async (payload) => {
  return axios.post(`${BASE_URL}api/v1/two_factor_authentication`, payload, { headers: authHeader() });
};

// TODO: Is using userId the best for security?
const disableMFA = async (userId) => {
  return axios.delete(`${BASE_URL}api/v1/two_factor_authentication/${userId}`, { headers: authHeader() });
};

export default {
  getUser,
  updateUser,
  enableMFA,
  getQRCodeUri,
  confirmMFA,
  disableMFA
};