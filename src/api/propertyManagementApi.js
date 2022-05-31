import api from "../utils/api";

export const getSectors = (data) => {
  return api.get("/sector");
};

export const getSector = (data) => {
  return api.get("/sector/" + data);
};

export const createSector = (data) => {
  return api.post("/sector", data);
};

export const updateSector = (id, data) => {
  return api.put("/sector/" + id, data);
};
