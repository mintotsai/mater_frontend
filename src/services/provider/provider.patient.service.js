import { client } from "../axiosClient";

const getPatients = async () => {
  return client.get(
    `api/v1/provider/patients`,
    {},
    { authorization: true }
  );
};

const createPatient = async (payload) => {
  return client.post(
    `api/v1/provider/patients`,
    payload,
    { authorization: true }
  )
}

export default {
  getPatients,
  createPatient
};