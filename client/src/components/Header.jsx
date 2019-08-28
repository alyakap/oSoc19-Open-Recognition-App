import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../img/logo-50x.png";
import SignOut from "../components/SignOut";

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      pathname: props.location.pathname
    };
  }
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar aqua-gradient">
          <div className="container">
            <a className="navbar-brand" href={`/`}>
              <img src={logo} alt="Open Recognition Logo" className="logo_on" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent-7"
              aria-controls="navbarSupportedContent-7"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent-7"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item" />
                <li className="nav-item" />
              </ul>
              
              {this.state.pathname !== "/" && (
                <div>
                  <SignOut />
                </div>
              )}
              
              
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
