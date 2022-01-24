import axios from 'axios';
import { authHeader } from "../helpers/auth.header";

// TODO: Get from env variable?
const BASE_URL = 'http://localhost:3001/';

const getUser = async (userId) => {
  return axios.get(`${BASE_URL}api/v1/users/${userId}`, { headers: authHeader() }).then((response) => {
    console.log(response);
    return response.data;
  });
};

const updateUser = async (userId, payload) => {
  return axios.put(`${BASE_URL}api/v1/users/${userId}/edit`, payload, { headers: authHeader() }).then((response) => {
    console.log(response);
    return response.data;
  });
};

export default {
  getUser,
  updateUser
};