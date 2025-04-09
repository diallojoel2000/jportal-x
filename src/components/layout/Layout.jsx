import { useEffect, useRef } from "react";
import {
  Outlet,
  Navigate,
  useLocation,
  useSubmit,
  useLoaderData,
} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrum from "./Breadcrum";
import Footer from "./Footer";
import CustomError from "./CustomError";

let idleTimeout = import.meta.env.VITE_IDLE_TIMEOUT;

const Layout = () => {
  var isAuthenticated = useLoaderData();
  console.log(`loader data ${isAuthenticated}`);
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
  }, [isAuthenticated, handleAutoLogout]);

  if (!isAuthenticated) {
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
