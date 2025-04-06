import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import EmptyLayout from "./components/layout/EmptyLayout";
import Users from "./pages/UsersPage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/users", element: <Users /> },
      { path: "/permissions", element: <Users /> },
    ],
  },
  {
    path: "/auth",
    errorElement: <ErrorPage />,
    element: <EmptyLayout />,
    children: [{ path: "login", element: <LoginPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
