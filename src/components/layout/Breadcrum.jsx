import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Breadcrum = () => {
  const [title, setTitle] = useState("");
  const location = useLocation();
  const pageTitle = useSelector((state) => state.pageTitle);

  useEffect(() => {
    if (pageTitle != null && pageTitle.pageTitle != null) {
      setTitle(pageTitle.pageTitle.payload);
    }
  }, [pageTitle]);

  let path = ["Home"];
  if (location.pathname !== "/") {
    path = location.pathname.trim().substring(1).split("/");
  }

  const isActive = (page) => {
    return location.pathname.endsWith(page) ? "active" : "";
  };
  const toSentenceCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="col-sm-6">{/* <h3 className="mb-0">{title}</h3> */}</div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-end">
          {path.map((page, index) => (
            <li className={`breadcrumb-item ${isActive(page)}`} key={index}>
              {isActive(page) ? (
                title
              ) : (
                <Link to={page}>{toSentenceCase(page)}</Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
export default Breadcrum;
