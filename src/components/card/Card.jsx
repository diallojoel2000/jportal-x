const Card = ({
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

export default Card;
