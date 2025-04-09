import { useActionData } from "react-router-dom";

const CustomError = () => {
  const data = useActionData();

  return (
    <>
      {data && data.errors && (
        <div class="alert alert-danger" role="alert">
          <ul>
            {Object.values(data.errors).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {data &&
        data.errors &&
        data.result.displayMessage(
          <div class="alert alert-success" role="alert">
            <ul>
              {Object.values(data.errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
};

export default CustomError;
