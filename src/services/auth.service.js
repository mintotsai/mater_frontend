import axios from "axios";
import { authHeader } from "../helpers/auth.header";
import { client } from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const login = async (payload) => {
  return client.post(
    `api/v1/login`,
    payload,
    { authorization: false }
  ).then((response) => {
    if (response.headers.authorization) {
      let authToken;
      if (response.headers.authorization && response.headers.authorization.split(' ')[0] === 'Bearer') {
        authToken = response.headers.authorization.split(' ')[1];
      }
      // localStorage.setItem('authToken', JSON.stringify(authToken));
      localStorage.setItem('authToken', authToken);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  });
};

const logout = async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  client.delete(
    `api/v1/logout`,
    {},
    { authorization: true }
  );
}

const signup = async (payload) => {
  return client.post(
    `api/v1/signup`,
    payload,
    { authorization: false }
  );
}

const forgot = async (payload) => {
  return client.post(
    `api/v1/password/forgot`,
    payload,
    { authorization: false }
  );
}

const reset = async (payload) => {
  return client.put(
    `api/v1/password/reset`,
    payload,
    { authorization: false }
  );
}

const confirmation = async (payload) => {
  return client.get(
    `api/v1/confirmation`,
    payload,
    { authorization: false }
  );
}

const updatePassword = async (payload) => {
  return client.put(
    `api/v1/password/update`,
    payload,
    { authorization: true }
  );
}

const unlock = async (payload) => {
  return client.get(
    `api/v1/unlock`,
    payload,
    { authorization: false }
  );
}

export default {
  login,
  logout,
  signup,
  forgot,
  reset,
  confirmation,
  updatePassword,
  unlock
};