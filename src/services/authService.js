import React from "react";
import axios from "axios";
import authHeader from "./authHeader";

const API_URL = "http://127.0.0.1:8000/api/v1/";

const registerAPI = (body) => {
  return axios.post(API_URL + "school/create_school_account/", body, {
    headers: authHeader(),
  });
};

const loginAPI = (body) => {
  return axios
    .post(API_URL + "auth/login/", body, {
      header: authHeader(),
    })
    .then((res) => {
      if (res.data.access) {
        localStorage.setItem("token", JSON.stringify(res.data.access));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("response from loginAPI:", res);
      }
      return res.data;
    })
    .catch((err) => console.log(err));
};

const logoutAPI = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = { registerAPI, loginAPI, logoutAPI };
export default authService;
