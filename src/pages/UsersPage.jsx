import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/card/Card";
import CardBody from "../components/card/CardBody";
import CardHeader from "../components/card/CardHeader";
import CardTool from "../components/card/CardTool";
import CardButton from "../components/card/CardButton";
import CardTitle from "../components/card/CardTitle";
import CardToolSearch from "../components/card/CardToolSearch";
import { fetchUsers } from "../util/http";
import Table from "../components/table/Table";
import PageModal from "../components/PageModal";
import CardFooter from "../components/card/CardFooter";

const PAGE_SIZE = 10;
const header = ["Fullname", "Username", "Email", "Failed Login"];
const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const searchRef = useRef();
  const modalRef = useRef();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "users",
      { pageNumber: currentPage, pageSize: PAGE_SIZE, search: searchText },
    ],
    queryFn: () => fetchUsers(currentPage, PAGE_SIZE, searchText),
  });

  const onOpenModal = () => {
    modalRef.current.showModal();
  };
  const onCloseModal = () => {
    modalRef.current.closeModal();
  };
  const handleSearch = () => {
    setSearchText(searchRef.current.value);
  };
  const changePage = (id) => {
    setCurrentPage(id);
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
      </tr>
    ));
  return (
    <>
      <PageModal ref={modalRef} />
      <Card size={12}>
        <CardHeader>
          <CardTitle title="User Management" />
          <CardTool>
            <CardButton clickAction={onOpenModal}>Add New User</CardButton>
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
    </>
  );
};

export default UsersPage;
