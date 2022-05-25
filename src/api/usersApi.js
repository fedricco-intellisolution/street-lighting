import api from "../utils/api";

export const readUser = (id) => {
    return api.get('/users/' + id);
}
