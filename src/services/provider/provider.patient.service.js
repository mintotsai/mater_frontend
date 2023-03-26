import { client } from "../axiosClient";

const getPatients = async () => {
  return client.get(
    `api/v1/provider/patients`,
    {},
    { authorization: true }
  );
};

const getPatient = async (userId) => {
  return client.get(
    `api/v1/provider/patients/${userId}`,
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

const updatePatient = async (userId, payload) => {
  return client.put(
    `api/v1/provider/patients/${userId}`,
    payload,
    { authorization: true }
  )
}

export default {
  getPatients,
  getPatient,
  createPatient,
  updatePatient
};