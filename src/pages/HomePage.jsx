import { useRef } from "react";
import { Card } from "../components/Card";

const HomePage = () => {
  const handleClick = () => {};
  return (
    <>
      <Card title={"Home"} size={12}>
        <p>Home</p>
        <button onClick={handleClick}>Show Alert</button>
      </Card>
    </>
  );
};
export default HomePage;
