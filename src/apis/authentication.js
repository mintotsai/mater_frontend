import axios from 'axios';

const baseUrl = 'http://localhost:3001/';
// const baseUrl = 'https://auth-app-rails-back.herokuapp.com/';

const login = payload => axios.post(`${baseUrl}api/v1/login`, payload);

const signup = payload => axios.post(`${baseUrl}api/v1/users`, payload)

const authenticationApi = {
  login,
  signup,
}

export default authenticationApi;