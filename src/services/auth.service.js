import axios from "axios";

const BASE_URL = 'http://localhost:3001/';

const login = async (payload) => {
  console.log("login");
  return axios
    .post(`${BASE_URL}api/v1/login`, payload).then((response) => {
      console.log(response);
      if (response.headers.authorization) {
        let authToken;
        if (response.headers.authorization && response.headers.authorization.split(' ')[0] === 'Bearer') {
          authToken = response.headers.authorization.split(' ')[1];
        }
        localStorage.setItem('authToken', JSON.stringify(authToken));
        localStorage.setItem("user", JSON.stringify(response.data.user));
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
  console.log("signup");
  return axios.post(`${BASE_URL}api/v1/users`, payload).then((response) => {
    console.log(response);
  });
}

const forgot = async (payload) => {
  console.log("forgot");
  return axios.post(`${BASE_URL}api/v1/password/forgot`, payload).then((response) => {
    console.log(response);
  });
}

const reset = async (payload) => {
  console.log("reset");
  return axios.put(`${BASE_URL}api/v1/password/reset`, payload).then((response) => {
    console.log(response);
  });
}

const confirmation = async (payload) => {
  console.log("confirmation");
  return axios.get(`${BASE_URL}api/v1/users/confirmation`, payload).then((response) => {
    console.log(response);
  });
}

export default {
  login,
  logout,
  signup,
  forgot,
  reset,
  confirmation
};