import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

let idleTimeout = import.meta.env.VITE_IDLE_TIMEOUT;
let refreshTokenTimout = import.meta.env.VITE_REFRESH_TOKEN_TIMEOUT;

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const navigate = useNavigate();

  const refreshTokenTimer = useRef();
  const idleTimer = useRef();
  const location = useLocation();

  const callbackUrl = location.state?.from?.pathname || "/";

  const handleAutoLogout = () => {
    clearTimeout(idleTimer.current);

    idleTimer.current = setTimeout(() => {
      console.log("Initiating idle logout");
      setIsIdle(true);
      handleLogout();
    }, idleTimeout);
  };

  const handleLogin = () => {
    refreshTokenTimer.current = setInterval(() => {
      handleRefreshToken();
    }, refreshTokenTimout);

    console.log("logging in");
    setIsAuthenticated(true);
    handleAutoLogout();
    navigate(callbackUrl, { replace: true });
  };

  const handleRefreshToken = () => {
    console.log("refreshing token");
  };
  const handleLogout = () => {
    console.log("logging out");
    clearTimeout(refreshTokenTimer.current);
    clearTimeout(idleTimer.current);
    setIsAuthenticated(false);
  };

  useEffect(() => {
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

    // Attach event listeners to the document
    if (isAuthenticated) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("keypress", handleKeyPress);
      handleAutoLogout(); // Start the initial idle timer when authenticated
    }

    // Set the initial timer

    // Cleanup function to remove event listeners and clear the timer
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("keypress", handleKeyPress);
      clearTimeout(idleTimer.current);
    };
  }, [isAuthenticated, handleAutoLogout]);

  return isAuthenticated ? (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  ) : (
    <button className="btn btn-primary" onClick={handleLogin}>
      Login
    </button>
  );
};

export default Login;
