import axios from 'axios';

const baseUrl = 'http://localhost:3001/';
// const baseUrl = 'https://auth-app-rails-back.herokuapp.com/';

const login = payload => axios.post(`${baseUrl}api/v1/login`, payload);

const logout = payload => axios.delete(`${baseUrl}api/v1/logout`);

const signup = payload => axios.post(`${baseUrl}api/v1/users`, payload)

const forgot = payload => axios.post(`${baseUrl}api/v1/password/forgot`, payload)

const reset = payload => axios.put(`${baseUrl}api/v1/password/reset`, payload)

const confirmation = payload => axios.get(`${baseUrl}api/v1/users/confirmation`, payload)

const authenticationApi = {
  login,
  logout,
  signup,
  forgot,
  reset,
  confirmation
}

export default authenticationApi;