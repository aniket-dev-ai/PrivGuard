import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000/api/vault";

const token = localStorage.getItem("token");

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

console.log("Token:", token);
console.log("Headers:", headers);
console.log("Base URL:", BASE_URL);

export const addVaultItem = async (itemData) => {
  const res = await axios.post(`${BASE_URL}/add`, itemData, { headers });
  return res.data;
};

export const getVaultItems = async () => {
  console.log("Fetching vault items...");
  const res = await axios.get(`${BASE_URL}`, { headers });
  console.log("Vault items:", res.data);
  return res.data;
};

export const deleteVaultItem = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return res.data;
};

export const createMasterKey = async (masterKey) => {
  console.log("Creating master key:", masterKey);
  const res = await axios.post(
    `${BASE_URL}/createmasterkey`,
    JSON.stringify({ masterKey }),
    { headers }
  );
  return res.data;
};

export const checkMasterKey = async (masterKey) => {
  const res = await axios.post(
    `${BASE_URL}/checkMasterKey`,
    JSON.stringify({ masterKey }),
    {
      headers,
    }
  );
  return res.data;
};
