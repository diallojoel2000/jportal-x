import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";

import { fetchUsers } from "../util/http";
import Table from "../components/Table";

const PAGE_SIZE = 10;
const header = ["Fullname", "Username", "Email", "Failed Login"];
const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const searchRef = useRef();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "users",
      { pageNumber: currentPage, pageSize: PAGE_SIZE, search: searchText },
    ],
    queryFn: () => fetchUsers(currentPage, PAGE_SIZE, searchText),
  });

  const handleSearch = () => {
    setSearchText(searchRef.current.value);
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
      <Table
        title="User Management"
        header={header}
        tableBody={tableBody}
        data={data}
        ref={searchRef}
        size={12}
        onSearch={handleSearch}
      />
    </>
  );
};

export default UsersPage;
