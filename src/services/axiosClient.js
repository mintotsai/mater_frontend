import axios from 'axios';
import store from '../redux/store';

import { logout } from "../redux/auth/actions";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

async function callLogout() {
  const { dispatch, navigate } = store;
  dispatch(logout())
    .then((response) => {
      // Is this kosher?
      window.location.href = "/login";
    })
    .catch((error) => {

    });
}

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      'Content-Type': 'application/json',
    },
  },
  callLogout,
});

export function createAxiosClient({
  options,
  callLogout,
}) {
  axios.defaults.withCredentials = true;
  const client = axios.create(options);

  client.interceptors.request.use(
    (config) => {
      if (config.authorization !== false) {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = "Bearer " + token;
        }
      }

      if (config.content_type) {
        config.headers["Content-Type"] = config.content_type;
      }

      if (config.content_md5) {
        config.headers["Content-MD5"] = config.content_md5;
      }

      if (config.content_disposition) {
        config.headers["Content-Disposition"] = config.content_disposition;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // If error, process all the requests in the queue and logout the user.
  const handleError = (error) => {
    console.log("handleError");
    console.log(error);
    // processQueue(error);
    Promise.all([
      callLogout()
    ]);

    return Promise.reject(error);
  };

  client.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    (error) => {
      console.log("interceptor response");
      console.log(error);


      // TODO: should we handle 403 too?
      if (
        error.response?.status === 401 &&
        (error.response?.data?.error === "Signature has expired" ||
          error.response?.data?.error === "You need to sign in or sign up before continuing." ||
          error.response?.data?.error === "revoked token")
      ) {
        return handleError(error);
      }

      return Promise.reject(error);
    }
  );

  return client;
}