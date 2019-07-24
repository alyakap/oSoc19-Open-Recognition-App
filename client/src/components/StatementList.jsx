import React from "react";
import StatementItem from "./StatementItem";
import PeopleTrustedUser from "./PeopleTrustedUser";

//import axios from "axios";

export class StatementList extends React.Component {
  state = {};

  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-9">
            {this.props.userStatements.map(statement => (
                  <StatementItem key={statement.id} statementInfo={statement} />
                  ))}
          </div>
        
          <div class="col-3">
              <div class="card">
                
                <div class="view overlay">
                  <a href="#!">
                    <div class="mask rgba-white-slight">
                      
                    </div>
                  </a>
                </div>
                <div class="text-white d-flex h-100 mask aqua-gradient-rgba">
                  <div class="first-content align-self-center p-3">
                    <h5 class="card-title">People who trusted {this.props.userInfo.first_name}</h5>
                  </div>
                </div>
                <div class="card-body overflow-auto"  style={{height: '200px'}}>
                  <div class="chip chip-md">
                    <PeopleTrustedUser userId={this.props.userId} />
                  </div>
              </div>
          </div>
      </div>
    </div>
    </div>

    );
  }
}

export default StatementList;
