import api from "../utils/api";

export const getLookUp = (filter) => {    
    return api.get('/look_up', {params : filter});
}

