import { useState } from "react";
import { useSelector } from "react-redux";

const CustomError = () => {
  const message = useSelector((state) => state.alert.message);
  console.log("Custom error", message);

  return (
    <>
      {message.payload && (
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
