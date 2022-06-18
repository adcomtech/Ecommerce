import axios from 'axios';

export const createTopic = async (topic, authtoken) =>
  await axios.post(`http://localhost:3500/api/topic`, topic, {
    headers: {
      authtoken,
    },
  });

export const getAllTopicByCount = async count =>
  await axios.get(`http://localhost:3500/api/topics/${count}`);

export const deleteTopic = async (slug, authtoken) =>
  await axios.delete(`http://localhost:3500/api/topic/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const getTopic = async slug =>
  await axios.get(`http://localhost:3500/api/topic/${slug}`);

export const updateTopic = async (slug, topic, authtoken) =>
  await axios.put(`http://localhost:3500/api/topic/${slug}`, topic, {
    headers: {
      authtoken,
    },
  });
