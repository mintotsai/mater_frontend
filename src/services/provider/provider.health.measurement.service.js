import { client } from "../axiosClient";

const deleteHealthMeasurement = async (id) => {
  return client.delete(
    `api/v1/provider/health-measurements/${id}`,
    {},
    { authorization: true }
  );
};

export default {
  deleteHealthMeasurement,
};