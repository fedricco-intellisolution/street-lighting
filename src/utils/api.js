import axios from "axios";

const requestHandler = (request) => {
  const accessToken = window.localStorage.getItem("accessToken");
  if (accessToken != null) {
    request.headers.Authorization = "Bearer " + accessToken;
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
  const instance = axios.create({
    baseURL: process.env.REACT_APP_DEV_API,
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
