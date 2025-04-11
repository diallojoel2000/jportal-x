import { Form, useActionData, useNavigate } from "react-router-dom";
const AuthForm = () => {
  const data = useActionData();
  const navigation = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  return (
    <>
      <div className="login-page">
        <div className="row">
          <div className="col-md-8">
            <span
              className="primary"
              style={{ fontSize: "40px", color: "darkblue" }}
            >
              <b>
                LOGIN TO MY
                <span style={{ color: "#000" }}>APP</span>
              </b>
            </span>
            <br />
            <span style={{ fontSize: "18px", textAlign: "justify" }}>
              This is just a sample app.
            </span>
          </div>
          <div className="col-md-4 float-right">
            <div className="login-box ">
              <div className="card card-outline card-primary">
                <div className="card-body login-card-body">
                  <p className="login-box-msg">Sign in to start your session</p>
                  {data && data.errors && (
                    <ul>
                      {Object.values(data.errors).map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  )}

                  <Form method="post">
                    <div className="input-group mb-3">
                      <input
                        name="username"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                      <div className="input-group-text">
                        <span className="bi bi-envelope"></span>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                      <div className="input-group-text">
                        <span className="bi bi-lock-fill"></span>
                      </div>
                    </div>
                    <div className="input-group mb-3">
                      <div className="col-8">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                          <label className="form-check-label">
                            {" "}
                            Remember Me{" "}
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="d-grid gap-2">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Sign In
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
