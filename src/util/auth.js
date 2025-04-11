import { jwtDecode } from "jwt-decode";
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const hasToken = () => {
  return getToken();
};

export const getUser = () => {
  return jwtDecode(getToken());
};
