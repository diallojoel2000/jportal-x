import { createContext, useContext } from "react";

const TableContext = createContext();

export const useTableContext = () => {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error("Table related components must be wrapped by <Table>");
  }
  return ctx;
};

const Table = ({ header, tableBody }) => {
  const contextValue = {};
  let i = 0;

  return (
    <TableContext.Provider value={contextValue}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            {header.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </TableContext.Provider>
  );
};
export default Table;
