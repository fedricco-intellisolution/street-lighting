import api from "../utils/api";

export const registerFault = (data) => {
    return api.post('/fault/register', data);
}

export const updateFaultRegistration = (id, data) => {
    return api.put('/fault/register/'+ id, data);
}

export const getFaults = (filter) => {    
    return api.get('/fault', {params : filter});
}

export const getFault = (id) => {
    return api.get('/fault/'+id);
}

export const updateFaultTechnician = (id, data) => {
    return api.put('/fault/technician/'+id, data)
}

export const forVerificationTO = (id, data) => {
    return api.post('/fault/technician/for_verification_to/'+id, data)
}

export const updateFaultTO = (id, data) => {
    return api.put('/fault/to/'+id, data)
}

export const forVerificationNEA = (id, data) => {
    return api.post('/fault/to/for_verification_nea/'+id, data)
}