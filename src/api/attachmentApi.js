import api from "../utils/api";

export const deleteAttachment = (id) => {
    return api.delete('/attachment/' + id);
}
