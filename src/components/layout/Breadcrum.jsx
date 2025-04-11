import { useLocation } from "react-router-dom";
const Breadcrum = () => {
  const location = useLocation();

  let path = ["Home"];
  if (location.pathname !== "/") {
    location.pathname.trim().split("/");
  }

  const isActive = (page) => {
    return location.pathname.endsWith(page) ? "active" : "";
  };
  return (
    <>
      <div className="col-sm-6">
        <h3 className="mb-0">{path[path.length - 1].toUpperCase()}</h3>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-end">
          {path.map((page, index) => (
            <li className={`breadcrumb-item ${isActive(page)}`} key={index}>
              {isActive(page) ? (
                page.toUpperCase()
              ) : (
                <a href="#">{page.toUpperCase()}</a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
export default Breadcrum;
