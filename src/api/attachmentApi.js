import api from "../utils/api";

export const deleteAttachment = (id) => {
    return api.delete('/attachment/' + id);
}

export const download = (id) => {
    return api.get('/attachment/download/' + id);
}
