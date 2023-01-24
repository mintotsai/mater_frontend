import { client } from "../axiosClient";

const getUsers = async () => {
  return client.get(
    `api/v1/admin/users`,
    {},
    { authorization: true }
  );
};

export default {
  getUsers,
};