import axios from "axios";
import { objectToQueryString } from "../utils/url";

let defaults = {
  apiURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_ROOT
      : process.env.REACT_APP_DEV_API_ROOT,
};

class api {
  // GET request
  async get(url, params) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      paramsSerializer: objectToQueryString,
      params: params,
    };

    return await axios
      .get(`${defaults.apiURL}${url}`, options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // POST request
  async post(url, data) {
    const options = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      paramsSerializer: objectToQueryString,
    };

    return await axios
      .post(`${defaults.apiURL}${url}`, data, options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // PUT request
  async put(url, data) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      paramsSerializer: objectToQueryString,
    };

    return await axios
      .put(`${defaults.apiURL}${url}`, data, options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // DELETE request
  async delete(url, data) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      paramsSerializer: objectToQueryString,
    };

    return await axios
      .delete(`${defaults.apiURL}${url}`, options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}

export default new api();
