import { useEffect } from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  useEffect(() => {
    document.body.className = "login-page bg-body-secondary";
  }, []);

  return (
    <section className="content">
      <div className="error-page">
        <h2 className="headline text-warning"> 404</h2>

        <div className="error-content">
          <h3>
            <i className="fas fa-exclamation-triangle text-warning"></i> Oops!
            Page not found.
          </h3>

          <p>
            We could not find the page you were looking for. Meanwhile, you may{" "}
            <Link to="/">return to the home page</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default ErrorPage;
