import api from "../utils/api";

export const createUser = (data) => {
    return api.post('/user', data);
}

export const updateUser = (id, data) => {
    return api.put('/user/'+id, data);
}

export const getUsers = () => {
    return api.get('/user');
}

export const getUser = (id) => {
    return api.get('/user/' + id);
}




