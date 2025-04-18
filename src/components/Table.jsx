import TableSearch from "./TableSearch";

const Table = ({ title, header, data, tableBody, ref, onSearch, size = 6 }) => {
  let i = 0;
  return (
    <>
      <div className={`col-md-${size}`}>
        <div className="card card-primary card-outline mb-4">
          <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <TableSearch ref={ref} onSearch={onSearch} />
          </div>
          <div className="card-body">
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
          </div>
          <div className="card-footer clearfix">
            {data && data.pageNumber && (
              <span>
                {" "}
                Page {data.pageNumber} of {data.totalPages}
              </span>
            )}

            <ul className="pagination pagination-sm m-0 float-end">
              <li className="page-item">
                <a className="page-link" href="#">
                  &laquo;
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  &raquo;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
