import React from "react";
import { Link, withRouter } from "react-router-dom";

function SignOut() {
  return (
    <div className="text-white">
      <Link to="/" onClick={() => localStorage.clear()}>
        <span className="font-weight-bold text-white">Sign out</span>
      </Link>
    </div>
  );
}

export default withRouter(SignOut);
