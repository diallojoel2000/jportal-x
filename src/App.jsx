import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Layout from "./components/layout/Layout";
import EmptyLayout from "./components/layout/EmptyLayout";
import UsersPage from "./pages/UserManagement/UsersPage";
import CreateUserPage from "./pages/UserManagement/CreateUserPage";
import RolePage from "./pages/UserManagement/RolePage";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { action as logoutAction } from "./pages/Logout";
import { hasToken } from "./util/auth";
import { queryClient } from "./util/http";

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
      { path: "/users", element: <UsersPage /> },
      { path: "/users/create", element: <CreateUserPage /> },
      { path: "/roles", element: <RolePage /> },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
