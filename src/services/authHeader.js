import {setAuthToken} from "../utils/backend.instance";

export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    setAuthToken(token)
  } else {
    return {
      "Content-Type": "application/json",
      accept: "application/json",
    };
  }
}
