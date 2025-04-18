const CardButton = ({
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
export default CardButton;
