import api from "../utils/api";

export const registerFault = (data) => {
    return api.post('/fault/register', data);
}

export const updateFaultRegistration = (id, data) => {
    return api.put('/fault/register/'+ id, data);
}

export const getFaults = () => {
    return api.get('/fault');
}

export const getFault = (id) => {
    return api.get('/fault/'+id);
}
