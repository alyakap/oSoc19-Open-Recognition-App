import React from "react";
import StatementItem from "./StatementItem";
import TrustedUserList from "./TrustedUserList";

function StatementList(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          {props.userStatements.map(statement => (
            <StatementItem key={statement.id} statementInfo={statement} />
          ))}
        </div>

        <div className="col-3">
          <div className="card">
            <div className="view overlay">
              <a href="#!">
                <div className="mask rgba-white-slight" />
              </a>
            </div>
            <div className="text-white d-flex h-100 mask aqua-gradient-rgba">
              <div className="first-content align-self-center p-3">
                <h5 className="card-title">
                  People who trusted {props.userInfo.first_name}
                </h5>
              </div>
            </div>
            <div
              className="card-body overflow-auto"
              style={{ height: "200px" }}
            >
              <div className="chip chip-md">
                <TrustedUserList TrustedMelist={props.trustedUsersList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatementList;
