import { client } from "../axiosClient";

const getUsers = async () => {
  return client.get(
    `api/v1/admin/users`,
    {},
    { authorization: true }
  );
};

const updateUser = async (userId, payload) => {
  return client.put(
    `api/v1/admin/users/${userId}`,
    payload,
    { authorization: true }
  );
};

// TODO: Is using userId the best for security?
const discardUser = async (userId) => {
  return client.delete(
    `api/v1/admin/users/${userId}/discard`,
    {},
    { authorization: true }
  );
};

const lockUser = async (userId) => {
  return client.patch(
    `api/v1/admin/users/${userId}/lock`,
    {},
    { authorization: true }
  );
};

const deactivateUser = async (userId) => {
  return client.patch(
    `api/v1/admin/users/${userId}/deactivate`,
    {},
    { authorization: true }
  );
};

const impersonateUser = async (userId) => {
  return client.post(
    `api/v1/admin/users/${userId}/impersonate`,
    {},
    { authorization: true }
  );
};

const stopImpersonatingUser = async () => {
  return client.post(
    `api/v1/admin/users/stop-impersonating`,
    {},
    { authorization: true }
  );
};

const resetUserPassword = async (userId) => {
  return client.patch(
    `api/v1/admin/users/${userId}/reset`,
    {},
    { authorization: true }
  );
};

const disableMFA = async (userId) => {
  return client.patch(
    `api/v1/admin/users/${userId}/disable-mfa`,
    {},
    { authorization: true }
  );
};

export default {
  getUsers,
  updateUser,
  discardUser,
  lockUser,
  deactivateUser,
  impersonateUser,
  stopImpersonatingUser,
  resetUserPassword,
  disableMFA,
};