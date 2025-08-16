import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  CardTool,
  CardToolLink,
  CardTitle,
} from "../../components/Card";
import { getRoleMatrix, updateRoleMatrix } from "../../util/roleServices";
import Page from "../../components/layout/Page";

const RolePage = () => {
  const [roleMatrix, setRoleMatrix] = useState([]);

  const hasPermission = (roleId, permissionId) => {
    return roleMatrix.some(
      (item) => item.roleId === roleId && item.permissionId == permissionId
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

    mutate({
      roleId: roleId,
      permissionId: permissionId,
      hasPermission: !hasPermission(roleId, permissionId),
    });
  };

  const { data } = useQuery({
    queryKey: ["getRoleMatrix"],
    queryFn: getRoleMatrix,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateRoleMatrix,
  });

  let table;
  useEffect(() => {
    if (data) {
      setRoleMatrix(data.roleMappings);
    }
  }, [data]);

  return (
    <Page title="Roles">
      <Card size={12}>
        <CardHeader>
          <CardTitle title="Role Matrix" />
          <CardTool>
            <CardToolLink path="/roles/create" title="Add Role" />
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
    </Page>
  );
};
export default RolePage;
