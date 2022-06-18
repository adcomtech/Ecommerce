import axios from 'axios';

export const getDeptDegrees = async () =>
  await axios.get(`http://localhost:3500/api/degrees`);

export const getDeptDegree = async slug =>
  await axios.get(`http://localhost:3500/api/degree/${slug}`);

export const deleteDeptDegree = async (slug, authtoken) =>
  await axios.delete(`http://localhost:3500/api/degree/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateDeptDegree = async (slug, deptDegree, authtoken) =>
  await axios.put(`http://localhost:3500/api/degree/${slug}`, deptDegree, {
    headers: {
      authtoken,
    },
  });

export const createDeptDegree = async (deptDegree, authtoken) =>
  await axios.post(`http://localhost:3500/api/degree`, deptDegree, {
    headers: {
      authtoken,
    },
  });
