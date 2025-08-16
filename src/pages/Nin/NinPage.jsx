import Page from "../../components/layout/Page";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { getNins } from "../../util/ninServices";
import {
  Card,
  CardBody,
  CardHeader,
  CardTool,
  CardToolLink,
  CardTitle,
  CardToolSearch,
  CardToolDateRange,
  CardFooter,
} from "../../components/Card";
import Table from "../../components/Table";

const PAGE_SIZE = 10;
const header = ["Nin", "First Name", "LastName", "D.O.B.", "Gender", ""];

const NinPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const searchRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const { data, isPending, isError, error } = useQuery({
    queryKey: [
      "customers",
      {
        pageNumber: currentPage,
        pageSize: PAGE_SIZE,
        search: searchText,
        startDate: startDate,
        endDate: endDate,
      },
    ],
    queryFn: () =>
      getNins(currentPage, PAGE_SIZE, searchText, startDate, endDate),
  });

  const handleSearch = () => {
    setSearchText(searchRef.current.value);
  };
  const handleDateChange = () => {
    if (startDateRef.current.value) setStartDate(startDateRef.current.value);

    if (endDateRef.current.value) setEndDate(endDateRef.current.value);
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };

  let i = 0;
  const tableBody =
    data &&
    data.items &&
    data.items.map((customer) => (
      <tr key={customer.id}>
        <td>{++i}</td>
        <td>{customer.nin}</td>
        <td>{customer.firstName}</td>
        <td>{customer.lastName}</td>
        <td>{customer.dateOfBirth}</td>
        <td>{customer.gender}</td>
        <td>
          Details
          {/* <span onClick={() => handleEditUser(customer.id)}>
            <i className="bi bi-pencil-square text-danger"></i>
          </span> */}
        </td>
      </tr>
    ));

  return (
    <Page title="NIN">
      <Card size={12}>
        <CardHeader>
          <CardTitle title="Customer Information" />
          <CardTool>
            <CardToolLink path="/nin/detail" title="New NIN Sync" />
            <CardToolDateRange
              startRef={startDateRef}
              endRef={endDateRef}
              onDateChange={handleDateChange}
            />{" "}
            &nbsp;&nbsp;
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

export default NinPage;
