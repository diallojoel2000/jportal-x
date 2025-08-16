import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const CustomError = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.alert.message);

  useEffect(() => {
    if (message && (message.payload || message.payload.isSuccess)) {
      setTimeout(() => {
        dispatch(alertActions.clearError());
      }, 10000);
    }
  }, [message, dispatch]);

  return (
    <>
      {message && message.payload && !message.payload.isSuccess && (
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
      {message && message.payload && message.payload.isSuccess && (
        <div className={`alert alert-success`} role="alert">
          <h5>Successful!</h5>
          <p>{message.payload.displayMessage}</p>
        </div>
      )}
    </>
  );
};
export default CustomError;
