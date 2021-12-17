import axios from 'axios';

const baseUrl = 'http://localhost:3001/';
// const baseUrl = 'https://auth-app-rails-back.herokuapp.com/';

const login = payload => axios.post(`${baseUrl}api/v1/login`, payload);

const authenticationApi = {
  login,
}

export default authenticationApi;