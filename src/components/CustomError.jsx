import { useState } from "react";
import { useSelector } from "react-redux";

const CustomError = ({ ref }) => {
  const [alertClass, setAlertClass] = useState("danger");
  const [message, setMessage] = useState();
  const [problemData, setProblemData] = useState();

  return (
    <>
      {message && (
        <div className={`alert alert-${alertClass}`} role="alert">
          {message}
          {problemData && problemData.errors && (
            <ul>
              {Object.values(problemData.errors).map((error) => (
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
