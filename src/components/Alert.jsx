import { useImperativeHandle, useState } from "react";

const Alert = ({ ref }) => {
  const [alertClass, setAlertClass] = useState("danger");
  const [message, setMessage] = useState();
  const [problemData, setProblemData] = useState();

  useImperativeHandle(ref, () => {
    return {
      showError(msg, problem = null) {
        setAlertClass("danger");
        setMessage(msg);
        if (problem) {
          setProblemData(problem);
        }
      },
      showSuccess(msg) {
        setAlertClass("success");
        setMessage(msg);
      },
    };
  });
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
export default Alert;
