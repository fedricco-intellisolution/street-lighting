import axios from 'axios';
//import store from './store';

// const requestHandler = request => {
//     const state = store.getState();

//     const AUTH_TOKEN = state.auth.token

//     if( AUTH_TOKEN != null) {
//         request.headers.Authorization = 'Bearer '+AUTH_TOKEN;  
//     }
    
//     return request;
// };

const responseHandler = response => {
    return response;
};

const errorHandler = (error) => {
    return Promise.reject(error);
};


const api = () => {

    const instance = axios.create({
      baseURL: process.env.REACT_APP_DEV_API,
      
    });

    // instance.interceptors.request.use(
    //     (request) => requestHandler(request),
    //     (error) => errorHandler(error)
    // );

    instance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
     );

    return instance;
}

export default api();