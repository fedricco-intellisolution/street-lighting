import api from "../utils/api";

/**
 * @returns sectors
 */
export const getSectors = (filter) => {
  return api.get("/sector", { params: filter ?? "" });
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

/**
 * @return sites
 */
export const getSites = (filter) => {
  return api.get("/site", { params: filter ?? "" });
};

export const createSite = (data) => {
  return api.post("/site", data);
};

export const getSite = (id) => {
  return api.get("/site/" + id);
};

export const updateSite = (id, data) => {
  return api.put("/site/" + id, data);
};

/**
 * @return levels
 */
export const getLevels = (filter) => {
  return api.get("/level", { params: filter ?? "" });
};

export const getLevel = (id) => {
  return api.get("/level/" + id);
};

export const createLevel = (data) => {
  return api.post("/level", data);
};

export const updateLevel = (id, data) => {
  return api.put("/level/" + id, data);
};

/**
 * @return areas
 */
export const getAreas = (filter) => {
  return api.get("/area", { params: filter ?? "" });
};

export const createArea = (data) => {
  return api.post("/area", data);
};

export const getArea = (id) => {
  return api.get("/area/" + id);
};

export const updateArea = (id, data) => {
  return api.put("/area/" + id, data);
};
