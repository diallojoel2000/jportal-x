import { useEffect, useRef } from "react";
import {
  Outlet,
  Navigate,
  useLocation,
  useSubmit,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrum from "./Breadcrum";
import CustomError from "./CustomError";
import Footer from "./Footer";
import { refreshToken } from "../../util/http";

let idleTimeout = import.meta.env.VITE_IDLE_TIMEOUT;

const Layout = () => {
  const isAuthenticated = useLoaderData();
  const navigation = useNavigate();
  const idleTimer = useRef();
  const location = useLocation();
  const submit = useSubmit();

  const handleAutoLogout = () => {
    clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      clearTimeout(idleTimer.current);
      submit(null, { method: "post", action: "/auth/logout" });
    }, idleTimeout);
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: refreshToken,
    refetchInterval: 280000,
    refetchIntervalInBackground: true,
    enabled: isAuthenticated ? true : false,
  });

  useEffect(() => {
    document.body.className = "sidebar-expand-lg bg-body-tertiary";

    const handleMouseMove = () => {
      if (isAuthenticated) {
        handleAutoLogout();
      }
    };
    const handleKeyPress = () => {
      if (isAuthenticated) {
        handleAutoLogout();
      }
    };

    if (isAuthenticated) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("keypress", handleKeyPress);

      handleAutoLogout();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keypress", handleKeyPress);
      clearTimeout(idleTimer.current);
    };
  }, [isAuthenticated, handleAutoLogout, isError]);

  if (!isAuthenticated || isError) {
    clearTimeout(idleTimer.current);
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <div className="app-wrapper">
        <Header />
        <Sidebar />
        <main className="app-main">
          <div className="app-content-header">
            <div className="container-fluid">
              <div className="row">
                <Breadcrum />
                <CustomError />
                <Outlet />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Layout;
