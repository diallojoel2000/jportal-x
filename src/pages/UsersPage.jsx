import Card from "../components/Card";

const UsersPage = () => {
  return (
    <>
      <Card title="User Management" size="12">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Fullname</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>admin@localhost</td>
              <td>John Doe</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default UsersPage;
