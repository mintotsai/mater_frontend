import { client } from "../axiosClient";

const createMedicationList = async (payload) => {
  return client.post(
    `api/v1/provider/medication-lists`,
    payload,
    { authorization: true }
  )
}

const deleteMedicationList = async (id) => {
  return client.delete(
    `api/v1/provider/medication-lists/${id}`,
    {},
    { authorization: true }
  );
};

const getMedications = async () => {
  return client.get(
    `api/v1/provider/medications`,
    {},
    { authorization: true }
  )
}

export default {
  createMedicationList,
  deleteMedicationList,
  getMedications
};