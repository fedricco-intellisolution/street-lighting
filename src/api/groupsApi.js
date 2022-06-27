import api from "../utils/api";

export const createGroup = (data) => {
    return api.post('/group', data);
}

export const updateGroup = (id, data) => {
    return api.put('/group/'+id, data);
}

export const getGroups = () => {
    return api.get('/group');
}

export const getGroup = (id) => {
    return api.get('/group/' + id);
}

export const deleteGroup = (id) => {
    return api.delete('/group/' + id);
}
