import { useEffect, useRef } from "react";
import { redirect } from "react-router-dom";
import { login } from "../http";
import AuthForm from "../components/AuthForm";
import { hasToken, getToken } from "../util/auth";

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
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("https://localhost:7048/Authentication/Login", {
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
    const response = await fetch(
      "https://localhost:7048/Authentication/RefreshToken",
      {
        method: "POST",
        //body: JSON.stringify(authData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    //const responseData = await response.json();
    console.log("refreshing token");
  }
};
