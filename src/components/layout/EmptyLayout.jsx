import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const EmptyLayout = () => {
  useEffect(() => {
    document.body.className = "login-page bg-body-secondary";
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};
export default EmptyLayout;
