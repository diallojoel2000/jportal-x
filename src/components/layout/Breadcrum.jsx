const Breadcrum = () => {
  return (
    <>
      <div className="col-sm-6">
        <h3 className="mb-0">Unfixed Layout</h3>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-end">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Unfixed Layout
          </li>
        </ol>
      </div>
    </>
  );
};
export default Breadcrum;
