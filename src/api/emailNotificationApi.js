import api from "../utils/api";

/**
 * @returns emails
 */
export const getEmails = (filter) => {
  return api.get("/email", { params: filter ?? "" });
};
