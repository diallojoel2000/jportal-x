const TableSearch = ({ ref, onSearch }) => {
  return (
    <>
      <div className="card-tools">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            ref={ref}
          />
          <div className="input-group-text" onClick={onSearch}>
            <span className="bi bi-search"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableSearch;
