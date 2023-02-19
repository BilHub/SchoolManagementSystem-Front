export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "JWT " + token,
    };
  } else {
    return {
      "Content-Type": "application/json",
      accept: "application/json",
    };
  }
}
