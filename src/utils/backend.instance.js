import axios from "axios";
export const api = axios.create({
  // baseURL: "https://api-school.code2bind.com/",
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "http://164.90.188.42/",
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
