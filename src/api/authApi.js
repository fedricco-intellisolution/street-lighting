import api from "../utils/api";

export const logIn = (data) => {
    return api.post('/auth/login', data);
}

export const logOut = (data) => {
    return api.post('/auth/logout', data);
}
