import api from "../utils/api";

/**
 * @return contract
 */

export const getContracts = () => api.get("/contract");

export const getContract = (id) => {
  return api.get("/contract/" + id);
};

export const createContract = (data) => {
  return api.post("/contract", data);
};

export const updateContract = (id, data) => {
  return api.put("/contract/" + id, data);
};
