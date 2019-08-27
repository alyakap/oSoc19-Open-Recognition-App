import React from "react";

function TrustedUserList(props) {
  const trustedUsers = props.TrustedMelist.map(user => (
    <div className="chip chip-md mb-3">
      <img src={user.photo} alt="Contact Person" />
      <span className="font-weight-bold teal-text mb-10">{`${user.first_name} ${
        user.last_name
      }`}</span>
    </div>
  ));
  return <div>{trustedUsers}</div>;
}

export default TrustedUserList;
