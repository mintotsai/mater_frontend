import { client } from "../axiosClient";

const updateHealthMeasurement = async (id, payload) => {
  return client.patch(
    `api/v1/provider/health-measurements/${id}`,
    payload,
    { authorization: true }
  );
}

const deleteHealthMeasurement = async (id) => {
  return client.delete(
    `api/v1/provider/health-measurements/${id}`,
    {},
    { authorization: true }
  );
};

export default {
  updateHealthMeasurement,
  deleteHealthMeasurement,
};