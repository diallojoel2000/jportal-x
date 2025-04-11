import { useRef } from "react";
import Card from "../components/Card";
import Alert from "../components/Alert";

const HomePage = () => {
  const alert = useRef();

  const handleClick = () => {
    alert.current.showSuccess("An error occured");
  };
  return (
    <>
      <Alert ref={alert} />
      <Card title={"Home"} size={12}>
        <p>Home</p>
        <button onClick={handleClick}>Show Alert</button>
      </Card>
    </>
  );
};
export default HomePage;
