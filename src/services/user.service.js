import { client } from "./axiosClient";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}`

const getUser = async (userId) => {
  return client.get(
    `api/v1/users/${userId}`,
    {},
    { authorization: true }
  );
};

const updateUser = async (userId, payload) => {
  return client.put(
    `api/v1/users/${userId}`,
    payload,
    { authorization: true }
  );
};

const enableMFA = async () => {
  return client.get(
    `api/v1/two_factor_authentication`,
    {},
    { authorization: true }
  );
}

const getQRCodeUri = async () => {
  return client.get(
    `api/v1/two_factor_authentication/qr-code-uri`,
    {},
    { authorization: true }
  );
};

const confirmMFA = async (payload) => {
  return client.post(
    `api/v1/two_factor_authentication`,
    payload,
    { authorization: true }
  );
};

// TODO: Is using userId the best for security?
const disableMFA = async (userId) => {
  return client.delete(
    `api/v1/two_factor_authentication/${userId}`,
    {},
    { authorization: true }
  );
};

const createPresignedUrl = async (payload) => {
  return client.post(
    `api/v1/presigned_url`,
    payload,
    { authorization: true }
  );
};

const directUpload = async (headers, directUploadUrl, payload) => {
  return client.put(
    `${directUploadUrl}`,
    payload,
    { authorization: false, content_type: headers["Content-Type"], content_md5: headers["Content-MD5"], content_disposition: headers["Content-Disposition"] }
  );
};

const getNotifications = async () => {
  return client.get(
    `api/v1/notifications`,
    {},
    { authorization: true }
  );
}

const dataImport = async (payload) => {
  return client.post(
    `api/v1/provider/data-import`,
    payload,
    { authorization: true }
  )
}

export default {
  getUser,
  updateUser,
  enableMFA,
  getQRCodeUri,
  confirmMFA,
  disableMFA,
  createPresignedUrl,
  directUpload,
  getNotifications,
  dataImport
};