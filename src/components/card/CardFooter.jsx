import { Link } from "react-router-dom";

const CardFooter = ({ onPageChange, pageNumber, totalPages }) => {
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

export default CardFooter;
