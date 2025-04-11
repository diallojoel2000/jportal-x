import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import EmptyLayout from "./components/layout/EmptyLayout";
import UsersPage from "./pages/UsersPage";
import RolePage from "./pages/UserManagement/RolePage";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { action as logoutAction } from "./pages/Logout";
import { hasToken } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <LoginPage />,
    action: authAction,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/logout",
    action: logoutAction,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    id: "root",
    loader: hasToken,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/user-management/users", element: <UsersPage /> },
      { path: "/user-management/roles", element: <RolePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
