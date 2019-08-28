import React, { Component } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

class Registeration extends Component {
  constructor() {
    super();
    this.state = {
      isSginUp: false
    };
  }

  switechSignInAndUpForms = boolean => {
    this.setState({ isSginUp: boolean });
  };

  render() {
    return (
      <div class="card">

        {this.state.isSginUp && (
          <SignUpForm switchMode={this.switechSignInAndUpForms} />
            )}

        {!this.state.isSginUp && (
          <SignInForm switchMode={this.switechSignInAndUpForms} />
        )}
        
      </div>
    );
  }
}

export default Registeration;
