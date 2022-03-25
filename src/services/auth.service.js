import axios from "axios";
import { authHeader } from "../helpers/auth.header";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const login = async (payload) => {
  return axios
    .post(`${BASE_URL}api/v1/login`, payload).then((response) => {
      if (response.headers.authorization) {
        let authToken;
        if (response.headers.authorization && response.headers.authorization.split(' ')[0] === 'Bearer') {
          authToken = response.headers.authorization.split(' ')[1];
        }
        localStorage.setItem('authToken', JSON.stringify(authToken));
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};

const logout = async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  axios.delete(`${BASE_URL}api/v1/logout`);
}

const signup = async (payload) => {
  return axios.post(`${BASE_URL}api/v1/signup`, payload);
}

const forgot = async (payload) => {
  return axios.post(`${BASE_URL}api/v1/password/forgot`, payload);
}

const reset = async (payload) => {
  return axios.put(`${BASE_URL}api/v1/password/reset`, payload);
}

const confirmation = async (payload) => {
  return axios.get(`${BASE_URL}api/v1/confirmation`, payload);
}

const updatePassword = async (payload) => {
  return axios.put(`${BASE_URL}api/v1/password/update`, payload, { headers: authHeader() });
}

export default {
  login,
  logout,
  signup,
  forgot,
  reset,
  confirmation,
  updatePassword
};