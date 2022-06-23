import api from "../utils/api";

/**
 * @returns emails
 */
export const getEmails = (filter) => {
  return api.get("/email-log", { params: filter ?? "" });
};
