import api from "../utils/api";

/**
 * @returns assets
 */
export const getAssets = () => api.get("/asset");

export const createAsset = (data) => {
  return api.post("/asset", data);
};

export const getAsset = (id) => {
  return api.get("/asset/" + id);
};

export const updateAsset = (id, data) => {
  return api.put("/asset/" + id, data);
};
