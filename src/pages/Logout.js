import { redirect } from "react-router-dom";

export async function action() {
  localStorage.removeItem("token");
  console.log("Call backend logout");
  return redirect("/");
}
