import { useState } from "react";
import { useActionData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { encrypt } from "../util/auth";
import { login } from "../http";

let baseUrl = import.meta.env.VITE_BACKEND_URL;
let refreshTokenTimout = import.meta.env.VITE_REFRESH_TOKEN_TIMEOUT;
let refreshTokenTimer;

const AuthForm = () => {
  const [message, setMessage] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSubmitting = navigation.state === "submitting";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const authData = {
      username: encrypt(data.username),
      password: encrypt(data.password),
    };

    try {
      var response = await login(authData);

      const responseData = await response.json();
      if (response.status === 400 || response.status === 401) {
        setMessage(responseData);
        return;
      }

      refreshTokenTimer = setInterval(() => {
        handleRefreshToken();
      }, refreshTokenTimout);

      const token = responseData.result.token;
      localStorage.setItem("token", token);
      dispatch(authActions.login());
      navigation("/");
    } catch (e) {
      console.log(e);
      const em = {
        errors: [
          "Could not authenticate user at the moment, please try again later",
        ],
      };
      setMessage(em);
      return;
    }
  };

  const handleRefreshToken = async () => {
    if (!isAuthenticated) {
      clearInterval(refreshTokenTimer);
    } else {
      const response = await fetch(`${baseUrl}/Authentication/RefreshToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        credentials: "include",
      });

      const responseData = await response.json();
      if (response.status === 400 || response.status === 401) {
        return responseData;
      }

      if (!response.ok) {
        throw json({ message: "Could not refresh token" }, { status: 500 });
      }
      const token = responseData.result.token;
      localStorage.setItem("token", token);
    }
  };

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
                  {message && message.errors && (
                    <ul>
                      {Object.values(message.errors).map((error) => (
                        <li className="text-danger" key={error}>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}

                  <form method="post" onSubmit={(event) => handleSubmit(event)}>
                    <div className="input-group mb-3">
                      <input
                        name="username"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
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
                        required
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
                  </form>
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
