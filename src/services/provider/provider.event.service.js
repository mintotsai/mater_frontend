import { client } from "../axiosClient";

const createEvent = async (payload) => {
  return client.post(
    `api/v1/provider/events`,
    payload,
    { authorization: true }
  )
}

const deleteEvent = async (id) => {
  return client.delete(
    `api/v1/provider/events/${id}`,
    {},
    { authorization: true }
  );
};

const updateEvent = async (id, payload) => {
  return client.patch(
    `api/v1/provider/events/${id}`,
    payload,
    { authorization: true }
  );
}

export default {
  createEvent,
  deleteEvent,
  updateEvent
};