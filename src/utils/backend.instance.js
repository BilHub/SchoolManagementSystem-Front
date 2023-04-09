import axios from "axios";
export const api = axios.create({
  baseURL: "https://api-school.code2bind.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (access) => {
  if (access) {
    api.defaults.headers.common["Authorization"] = "JWT " + access;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};