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

export default {
  getUsers,
  updateUser
};