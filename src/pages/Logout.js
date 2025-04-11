import { redirect } from "react-router-dom";
import { getToken } from "../util/auth";

let baseUrl = import.meta.env.VITE_BACKEND_URL;
export async function action() {
  const response = await fetch(`${baseUrl}/Authentication/Logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    credentials: "include",
  });

  localStorage.removeItem("token");
  return redirect("/");
}
