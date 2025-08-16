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
import RoleForm from "../../components/RoleForm";
import CustomError from "../../components/layout/CustomError";
import Page from "../../components/layout/Page";

const CreateRolePage = () => {
  const [showError, setShowError] = useState(false);
  const handleShowError = () => {
    setShowError(true);
  };
  return (
    <Page title="Create Roles">
      <Card size={6}>
        <CardHeader>
          <CardTitle title="Create Role" />
        </CardHeader>
        <CardBody>
          <RoleForm />
        </CardBody>
      </Card>
    </Page>
  );
};

export default CreateRolePage;
