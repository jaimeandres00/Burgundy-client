export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.authToken) {
    return { "x-auth-token": user.authToken };
  } else {
    return {};
  }
}
