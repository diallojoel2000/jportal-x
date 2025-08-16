const CustomerInfo = (prop) => {
  return (
    <div className="card">
      <div className="card-body">
        <dl className="row">
          <dt className="col-sm-5">First Name</dt>
          <dd className="col-sm-7">{prop.firstName}</dd>

          <dt className="col-sm-5">Last Name</dt>
          <dd className="col-sm-7">{prop.lastName}</dd>

          <dt className="col-sm-5">Date of Birth</dt>
          <dd className="col-sm-7">{prop.dateOfBirth}</dd>

          <dt className="col-sm-5">Gender</dt>
          <dd className="col-sm-7">{prop.gender}</dd>

          <dt className="col-sm-5">ID Type</dt>
          <dd className="col-sm-7">{prop.idType}</dd>

          <dt className="col-sm-5">Nationality</dt>
          <dd className="col-sm-7">{prop.nationalityId}</dd>

          <dt className="col-sm-5">NIN</dt>
          <dd className="col-sm-7">{prop.nin}</dd>

          <dt className="col-sm-5">Permernent Residential Address</dt>
          <dd className="col-sm-7">{prop.permernentResidentialAddress}</dd>

          <dt className="col-sm-5">Phone Number</dt>
          <dd className="col-sm-7">{prop.phoneNumber}</dd>

          <dd className="col-sm-12">
            <img
              src={`data:image/png;base64,${prop.photo}`}
              alt="Photo"
              className="img-fluid mt-3"
            />
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default CustomerInfo;
