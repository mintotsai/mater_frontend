import { client } from "../axiosClient";

const getPatients = async () => {
  return client.get(
    `api/v1/provider/patients`,
    {},
    { authorization: true }
  );
};

export default {
  getPatients,
};