import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTool,
  CardToolLink,
  CardTitle,
  CardToolSearch,
  CardFooter,
} from "../../components/Card";
import UserForm from "../../components/UserForm";
import CustomError from "../../components/layout/CustomError";

const CreateUserPage = () => {
  const [showError, setShowError] = useState(false);
  const handleShowError = () => {
    setShowError(true);
  };
  return (
    <>
      {showError && <CustomError />}
      <Card size={8}>
        <CardHeader>
          <CardTitle title="Create User" />
        </CardHeader>
        <CardBody>
          <UserForm onError={handleShowError} />
        </CardBody>
      </Card>
    </>
  );
};

export default CreateUserPage;
