import api from "../utils/api";

/**
 * @returns email templates
 */
export const getEmailTemplates = (filter) => {
  return api.get("/email-template", { params: filter ?? "" });
};

export const getEmail = (id) => {
  return api.get(`/email-template/${id}`);
};

export const updateEmailTemplate = (id, data) => {
  return api.put(`/email-template/${id}`, data);
};

export const createEmailTemplate = (data) => {
  return api.post(`/email-template`, data);
};
