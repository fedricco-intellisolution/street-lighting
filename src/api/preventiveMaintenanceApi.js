import api from "../utils/api";

/**
 * @returns Checklist type
 */

export const getChecklistTypes = () => {
  return api.get("/checklist");
};

export const getChecklistType = (data) => {
  return api.get(`/checklist/${data}`);
};

export const createChecklistType = (data) => {
  return api.post("/checklist", data);
};

export const updateChecklistType = (id, data) => {
  return api.put(`/checklist/${id}`, data);
};

/**
 * @returns Checklist items
 */

export const getChecklistItems = () => {
  return api.get("/checklist_item");
};

export const getChecklistItem = (data) => {
  return api.get(`/checklist_item/${data}`);
};

export const createChecklistItem = (data) => {
  return api.post("/checklist_item", data);
};

export const updateChecklistItem = (id, data) => {
  return api.put(`/checklist_item/${id}`, data);
};

/**
 * @returns Checklist sub items
 */

export const getChecklistSubItems = () => {
  return api.get("/checklist_subitem");
};

export const getChecklistSubItem = (data) => {
  return api.get(`/checklist_subitem/${data}`);
};

export const createChecklistSubItem = (data) => {
  return api.post("/checklist_subitem", data);
};

export const updateChecklistSubItem = (id, data) => {
  return api.put(`/checklist_subitem/${id}`, data);
};

/**
 * @returns Work schedule
 */

export const getWorkSchedules = () => {
  return api.get("/work_schedule");
};

export const getWorkScheduleSites = () => {
  return api.get(`/work_schedule/sites`);
};

export const getWorkSchedule = (data) => {
  return api.get(`/work_schedule/${data}`);
};

export const createWorkSchedule = (data) => {
  return api.post("/work_schedule", data);
};

export const updateWorkSchedule = (id, data) => {
  return api.put(`/work_schedule/${id}`, data);
};

/**
 * @returns Pending checklist
 */

export const getPendingChecklists = (data) => {
  return api.post("/pending_checklist", data);
};

export const getPendingChecklist = (data) => {
  return api.get(`/pending_checklist/${data}`);
};

export const updatePendingChecklist = (id, data) => {
  return api.put(`/pending_checklist/${id}`, data);
};
