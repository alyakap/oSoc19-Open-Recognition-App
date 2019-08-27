import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
      <div>
        <div style={{ textAlign: "center" }}>
          <NavLink to="/" onClick={() => this.switechSignInAndUpForms(false)}>
            Sign In
          </NavLink>
          <NavLink to="/" onClick={() => this.switechSignInAndUpForms(true)}>
            Sign Up
          </NavLink>
        </div>
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
