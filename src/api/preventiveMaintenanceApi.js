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
