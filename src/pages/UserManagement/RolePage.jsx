import { useState, useEffect } from "react";
import Card from "../../components/Card";

const ROLES = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Teller" },
  { id: 3, name: "Super Admin" },
  { id: 4, name: "Consultant" },
];
const PERMISSIONS = [
  { id: "1", name: "ManageAccount" },
  { id: "2", name: "ManageCompany" },
  { id: "3", name: "ManageRole" },
  { id: "4", name: "ManageUser" },
];

const ROLE_MATRIX = [
  { roleId: 1, permissionId: "4" },
  { roleId: 1, permissionId: "3" },
  { roleId: 2, permissionId: "2" },
  { roleId: 2, permissionId: "1" },
];

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

  useEffect(() => {
    setRoleMatrix(ROLE_MATRIX);
  }, []);

  return (
    <Card title={"Role Matrix"} size={12}>
      <table className="table table-hover text-nowrap">
        <thead>
          <tr>
            <th>Permissions</th>
            {ROLES.map((role) => (
              <th key={role.id} className="text-center">
                {role.name}
              </th>
            ))}
          </tr>
          {PERMISSIONS.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              {ROLES.map((role) => (
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
    </Card>
  );
};
export default RolePage;
