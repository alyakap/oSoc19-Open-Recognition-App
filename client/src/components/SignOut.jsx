import React from "react";
import { Link, withRouter } from "react-router-dom";

function SignOut() {
  return (
    <div>
      <Link to="/" onClick={() => localStorage.clear()}>
        SignOut
      </Link>
    </div>
  );
}

export default withRouter(SignOut);
