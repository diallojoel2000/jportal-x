import { Link } from "react-router-dom";

export const Card = ({
  className = "card card-primary card-outline mb-4",
  children,
  size = 6,
}) => {
  return (
    <>
      <div className={`col-md-${size}`}>
        <div className={className}>{children}</div>
      </div>
    </>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

export const CardTitle = ({ title }) => {
  return <div className="card-title">{title}</div>;
};

export const CardToolSearch = ({ ref, onSearch }) => {
  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        ref={ref}
      />
      <div className="input-group-text" onClick={onSearch}>
        <span className="bi bi-search"></span>
      </div>
    </>
  );
};
export const CardToolLink = ({ title, path }) => {
  return (
    <div>
      <Link className="btn btn-link" to={path}>
        {title}
      </Link>
      &nbsp;&nbsp;
    </div>
  );
};
export const CardTool = ({ children }) => {
  return (
    <>
      <div className="card-tools">
        <div className="input-group">{children}</div>
      </div>
    </>
  );
};
export const CardBody = ({ children }) => {
  return <div className="card-body">{children}</div>;
};

export const CardButton = ({
  className = "btn btn-primary",
  clickAction,
  children,
}) => {
  return (
    <>
      <div>
        <button className={className} onClick={clickAction}>
          {children}
        </button>{" "}
        &nbsp;
      </div>
    </>
  );
};

export const CardFooter = ({ onPageChange, pageNumber, totalPages }) => {
  let pages = 3;
  if (pages > totalPages) {
    pages = totalPages;
  }
  const content = [];

  if (pages > 0) {
    // Previous button
    content.push(
      <li key="prev" className="page-item">
        <Link
          className={`page-link ${pageNumber <= 1 ? "disabled" : ""}`}
          onClick={() => onPageChange(pageNumber - 1)}
        >
          &laquo;
        </Link>
      </li>
    );

    // Page numbers
    for (let i = 1; i <= pages; i++) {
      content.push(
        <li key={i} className="page-item">
          <Link
            className={`page-link ${i === pageNumber ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Link>
        </li>
      );
    }

    // Next button
    content.push(
      <li key="next" className="page-item">
        <Link
          className={`page-link ${pageNumber >= pages ? "disabled" : ""}`}
          onClick={() => onPageChange(pageNumber + 1)}
        >
          &raquo;
        </Link>
      </li>
    );
  }

  return (
    <div className="card-footer clearfix">
      <span>
        Page {pageNumber} of {totalPages}
      </span>

      <ul className="pagination pagination-sm m-0 float-end">{content}</ul>
    </div>
  );
};
