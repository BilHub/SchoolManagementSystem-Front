export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "JWT " + user.accessToken,
    };
  } else {
    return {
      "Content-Type": "application/json",
      accept: "application/json",
    };
  }
}
