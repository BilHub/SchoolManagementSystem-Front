import axios from "axios";
import { api, setAuthToken } from "../utils/backend.instance";
const registerAPI = (body) => {
  return api.post("api/v1/school/create_school_account/", body, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });
};

const loginAPI = (body) => {
  return api
    .post("api/v1/auth/login/", body)
    .then((res) => {
      if (res.data.access) {
        setAuthToken(res.data.access);
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
