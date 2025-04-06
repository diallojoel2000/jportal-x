import { useEffect, useState } from "react";
import { Outlet, useNavigate, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Breadcrum from "./Breadcrum";
import Footer from "./Footer";
const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.className = "sidebar-expand-lg bg-body-tertiary";
  }, []);

  if (!isAuthenticated) {
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
