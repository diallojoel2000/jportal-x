import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  CardTool,
  CardToolLink,
  CardTitle,
} from "../../components/Card";
import { getRoleMatrix } from "../../util/http";

const RolePage = () => {
  const [roleMatrix, setRoleMatrix] = useState([]);

  const hasPermission = (roleId, permissionId) => {
    return roleMatrix.some(
      (item) => item.roleId === roleId && item.permissionId === permissionId
    );
  };

  const checkToggle = (roleId, permissionId) => {
    setRoleMatrix((prevMatrix) => {
      const exists = prevMatrix.some(
        (item) => item.roleId === roleId && item.permissionId === permissionId
      );

      if (exists) {
        return prevMatrix.filter(
          (item) =>
            !(item.roleId === roleId && item.permissionId === permissionId)
        );
      } else {
        return [{ roleId: roleId, permissionId: permissionId }, ...prevMatrix];
      }
    });
  };

  const { data, isPending, isError, error, isSuccess } = useQuery({
    queryKey: ["getRoleMatrix"],
    queryFn: getRoleMatrix,
  });
  if (isError) {
    console.log("An error occured");
  }
  let table;
  useEffect(() => {
    if (data) {
      setRoleMatrix(data.roleMappings);
    }
  }, [data]);

  return (
    <Card size={12}>
      <CardHeader>
        <CardTitle title="Role Matrix" />
        <CardTool>
          <CardToolLink path="#" title="Add Role" />
        </CardTool>
      </CardHeader>
      <CardBody>
        {/* <Table header={header} tableBody={tableBody}></Table> */}
        <table className="table table-striped text-nowrap">
          <thead>
            <tr>
              <th>Permissions</th>
              {data &&
                data.roles.map((role) => (
                  <th key={role.id} className="text-center">
                    {role.name}
                  </th>
                ))}
            </tr>
            {data &&
              data.permissions.map((permission) => (
                <tr key={permission.id}>
                  <td>{permission.name}</td>
                  {data &&
                    data.roles.map((role) => (
                      <td key={role.id} className="text-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={hasPermission(role.id, permission.id)}
                          onChange={() => {
                            checkToggle(role.id, permission.id);
                          }}
                        />
                      </td>
                    ))}
                </tr>
              ))}
          </thead>
        </table>
      </CardBody>
    </Card>
  );
};
export default RolePage;
