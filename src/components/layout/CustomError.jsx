import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const CustomError = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.alert.message);

  useEffect(() => {
    if (message && message.payload) {
      setTimeout(() => {
        dispatch(alertActions.clearError());
      }, 3000);
    }
  }, [message, dispatch]);

  return (
    <>
      {message && message.payload && (
        <div className={`alert alert-danger`} role="alert">
          <h5>{message.payload.title}</h5>
          {message.payload.errors && (
            <ul>
              {Object.values(message.payload.errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};
export default CustomError;
