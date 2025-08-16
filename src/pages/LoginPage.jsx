import { useEffect, useRef } from "react";
import { redirect, useNavigate, useLoaderData } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { encrypt } from "../util/auth";

let baseUrl = import.meta.env.VITE_BACKEND_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useLoaderData();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
    document.body.className = "login-page bg-body-secondary";
  }, [isAuthenticated]);
  return <>{!isAuthenticated && <AuthForm />}</>;
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
  localStorage.setItem("token", token);

  return redirect("/");
}
