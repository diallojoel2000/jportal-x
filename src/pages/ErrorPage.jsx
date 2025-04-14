import { useEffect } from "react";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  useEffect(() => {
    document.body.className = "login-page bg-body-secondary";
  }, []);

  return (
    <section className="content">
      <div className="error-page">
        <h2 className="headline text-danger"> 500</h2>

        <div className="error-content">
          <h3>
            <i className="bi bi-exclamation-triangle text-danger"></i> Oops!
            Sopmething went wrong.
          </h3>

          <p>
            We could not access the resource you were looking for. Meanwhile,
            you may <Link to="/">return to the home page</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
export default ErrorPage;
