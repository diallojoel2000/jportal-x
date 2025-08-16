import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createRole } from "../util/roleServices";
import { useDispatch } from "react-redux";
import { alertActions } from "../store/alert-slice";

const RoleForm = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      navigation("/roles");
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
          <div className="col-md-12">
            <label className="form-label">Role Name</label>
            <input
              type="text"
              name="roleName"
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

export default RoleForm;
