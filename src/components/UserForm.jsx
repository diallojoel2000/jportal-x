import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../util/http";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";

const UserForm = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigation("/users");
    },
    onError: (error, data) => {
      dispatch(alertActions.showError(error?.info));
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const command = Object.fromEntries(fd);
    mutate(command);
  };

  return (
    <>
      <form
        className="needs-validation"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Username</label>
            <div className="input-group has-validation">
              <span className="input-group-text">@</span>
              <input
                type="text"
                name="username"
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 offset-md-6">
            <button
              className={`btn btn-primary float-end ${
                isPending ? "disabled" : ""
              }`}
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UserForm;
