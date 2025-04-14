import { useEffect, useRef } from "react";
import { redirect } from "react-router-dom";
import { login } from "../http";
import AuthForm from "../components/AuthForm";
import { hasToken, getToken, encrypt } from "../util/auth";

let baseUrl = import.meta.env.VITE_BACKEND_URL;
let refreshTokenTimout = import.meta.env.VITE_REFRESH_TOKEN_TIMEOUT;
let refreshTokenTimer;

const LoginPage = () => {
  useEffect(() => {
    document.body.className = "login-page bg-body-secondary";
  }, []);
  return <AuthForm />;
};

export default LoginPage;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: encrypt(data.get("username")),
    password: encrypt(data.get("password")),
  };

  const response = await fetch(`${baseUrl}/Authentication/Login`, {
    method: "POST",
    body: JSON.stringify(authData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const responseData = await response.json();
  if (response.status === 400 || response.status === 401) {
    return responseData;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }
  const token = responseData.result.token;

  refreshTokenTimer = setInterval(() => {
    handleRefreshToken();
  }, refreshTokenTimout);

  localStorage.setItem("token", token);

  return redirect("/");
}

const handleRefreshToken = async () => {
  const token = getToken();

  if (token === null || token === undefined) {
    clearInterval(refreshTokenTimer);
  } else {
    const response = await fetch(`${baseUrl}/Authentication/RefreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      credentials: "include",
    });

    const responseData = await response.json();
    if (response.status === 400 || response.status === 401) {
      return responseData;
    }

    if (!response.ok) {
      throw json({ message: "Could not refresh token" }, { status: 500 });
    }
    const token = responseData.result.token;
    localStorage.setItem("token", token);
  }
};
