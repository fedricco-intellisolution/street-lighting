import axios from 'axios';

const requestHandler = request => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken != null) {
        request.headers.Authorization = 'Bearer ' + accessToken;
    }
    return request;
};

const responseHandler = (response) => {
    return response;
};

const errorHandler = (error) => {
    return Promise.reject(error);
};

const api = () => {
    let _baseURL = '';

    var base_url = window.location.origin;

    if (base_url.includes("localhost")) {
        _baseURL = process.env.REACT_APP_DEV_API
    } else {
        _baseURL = process.env.REACT_APP_PROD_API
    }
    console.log(_baseURL)
    const instance = axios.create({
        baseURL: _baseURL,
    });

    instance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    );

    instance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );

    return instance;
};

export default api();
