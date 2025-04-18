const CardToolSearch = ({ ref, onSearch }) => {
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
export default CardToolSearch;
