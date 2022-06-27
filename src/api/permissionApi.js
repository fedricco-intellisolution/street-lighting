import api from "../utils/api";

export const getPermissions = () => {
  return api.get("/permission");
};

export const getPermission = (id) => {
  return api.get(`/permission/${id}`);
};

export const createPermission = (data) => {
  return api.post("/permission", data);
};

export const updatePermission = (id, data) => {
  return api.put(`/permission/${id}`, data);
};

export const deletePermission = (id) => {
  return api.delete(`/permission/${id}`);
};
