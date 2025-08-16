import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUsers, adminResetPassword } from "../../util/http";
import Table from "../../components/Table";
import Page from "../../components/layout/Page";
import { useDispatch } from "react-redux";
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
import { alertActions } from "../../store/alert-slice";

const PAGE_SIZE = 10;
const header = ["Fullname", "Username", "Email", "Failed Login", "Role", ""];
const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const searchRef = useRef();
  const modalRef = useRef();
  const dispatch = useDispatch();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "users",
      { pageNumber: currentPage, pageSize: PAGE_SIZE, search: searchText },
    ],
    queryFn: () => fetchUsers(currentPage, PAGE_SIZE, searchText),
  });

  const { mutate } = useMutation({
    mutationFn: adminResetPassword,
    onSuccess: (data) => {
      //console.log(data);
      dispatch(alertActions.showSuccess(data));
    },
    onError: (error, data) => {
      dispatch(alertActions.showError(error?.info));
    },
  });

  const onOpenModal = () => {
    modalRef.current.showModal();
  };

  const handleSearch = () => {
    setSearchText(searchRef.current.value);
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };
  const handleDisableUser = (id) => {
    console.log("disabled", id);
  };
  const handlePasswordReset = (id) => {
    mutate({ UserId: id });
  };
  const handleEditUser = (id) => {
    console.log("edit", id);
  };

  let i = 0;
  const tableBody =
    data &&
    data.items &&
    data.items.map((user) => (
      <tr key={user.id}>
        <td>{++i}</td>
        <td>{user.fullName}</td>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{user.accessFailedCount}</td>
        <td>Not Applicable</td>
        <td>
          <span onClick={() => handleDisableUser(user.id)}>
            <i title="Disable user" className="bi bi-lock text-danger"></i>
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span onClick={() => handlePasswordReset(user.id)}>
            <i
              title="Reset password"
              className="bi bi-arrow-clockwise text-danger"
            ></i>
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span onClick={() => handleEditUser(user.id)}>
            <i className="bi bi-pencil-square text-danger"></i>
          </span>
        </td>
      </tr>
    ));
  return (
    <Page title="Users">
      <Card size={12}>
        <CardHeader>
          <CardTitle title="User Management" />
          <CardTool>
            <CardToolLink path="/users/create" title="Add New User" />
            <CardToolSearch ref={searchRef} onSearch={handleSearch} />
          </CardTool>
        </CardHeader>
        <CardBody>
          <Table header={header} tableBody={tableBody}></Table>
        </CardBody>
        <CardFooter
          onPageChange={changePage}
          pageNumber={currentPage}
          totalPages={data ? data.totalPages : 1}
        />
      </Card>
    </Page>
  );
};

export default UsersPage;
