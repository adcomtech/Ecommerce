import axios from 'axios';

export const getDepartments = async () =>
  await axios.get(`http://localhost:3500/api/departments`);

export const getDepartment = async slug =>
  await axios.get(`http://localhost:3500/api/department/${slug}`);

export const deleteDepartment = async (slug, authtoken) =>
  await axios.delete(`http://localhost:3500/api/department/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateDepartment = async (slug, department, authtoken) =>
  await axios.put(`http://localhost:3500/api/department/${slug}`, department, {
    headers: {
      authtoken,
    },
  });

export const createDepartment = async (department, authtoken) =>
  await axios.post(`http://localhost:3500/api/department`, department, {
    headers: {
      authtoken,
    },
  });
