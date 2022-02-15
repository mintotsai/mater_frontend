import axios from 'axios';
import { authHeader } from "../helpers/auth.header";

// TODO: Get from env variable?
const BASE_URL = 'http://localhost:3001/';

const getUser = async (userId) => {
  return axios.get(`${BASE_URL}api/v1/users/${userId}`, { headers: authHeader() });
};

const updateUser = async (userId, payload) => {
  return axios.put(`${BASE_URL}api/v1/users/${userId}`, payload, { headers: authHeader() });
};

export default {
  getUser,
  updateUser
};