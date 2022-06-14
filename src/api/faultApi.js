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

export const attendFault = (fault_id, site_id) => {
    return api.post(`/fault/technician/attend/${fault_id}/${site_id}`);
}

export const updateFaultTechnician = (id, data) => {
    return api.post('/fault/technician/'+id, data)
}

export const forVerificationTO = (id, data) => {
    return api.post('/fault/technician/for_verification_to/'+id, data)
}

export const requestEOT = (id) => {
    return api.post('/fault/technician/request_eot/'+ id)
}

export const updateFaultTO = (id, data) => {
    return api.post('/fault/to/'+id, data)
}

export const forVerificationNEA = (id, data) => {
    return api.post('/fault/to/for_verification_nea/'+id, data)
}

export const forwardToTechnician = (id) => {
    return api.post('/fault/to/forward_to_technician/'+id)
}

export const verifyFault = (id) => {
    return api.post('/fault/nea/verify/'+id)
}

export const saveIncidentReport = (data) => {
    return api.post('/fault_incident_report', data)
}

export const updateIncidentReport = (id, data) => {
    return api.post('/fault_incident_report/'+id, data)
}

export const getIncidentReport = (id) => {
    return api.get('/fault_incident_report/'+id)
}

export const getIncidentReports = () => {
    return api.get('/fault_incident_report')
}

export const applyEOT = (data) => {
    return api.post('/fault_eot', data)
}

export const approveEOT = (id) => {
    return api.post('/fault_eot/approve/'+ id)
}


