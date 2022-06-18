import axios from 'axios';

export const getMaterials = async () =>
  await axios.get(`http://localhost:3500/api/material-types`);

export const getMaterial = async slug =>
  await axios.get(`http://localhost:3500/api/material-type/${slug}`);

export const deleteMaterial = async (slug, authtoken) =>
  await axios.delete(`http://localhost:3500/api/material-type/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateMaterial = async (slug, material, authtoken) =>
  await axios.put(`http://localhost:3500/api/material-type/${slug}`, material, {
    headers: {
      authtoken,
    },
  });

export const createMaterial = async (material, authtoken) =>
  await axios.post(`http://localhost:3500/api/material-type`, material, {
    headers: {
      authtoken,
    },
  });
