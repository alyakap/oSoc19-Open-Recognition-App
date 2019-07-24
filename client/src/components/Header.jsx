import React, { Component } from "react";
import logo from "../img/logo-50x.png";

class Header extends Component {
  state = {};
  render() {
    return (
      <header>
         <nav className="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar aqua-gradient">
          <div className="container">
            <a className="navbar-brand" href={`www.google.com`}>
              <img src={logo} alt="Open Recognition Logo" className="logo_on" />
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-7" aria-controls="navbarSupportedContent-7"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent-7">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item"></li>
                <li className="nav-item"></li>
              </ul>
            <form className="form-inline">
              <div className="md-form my-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
              </div>
            </form>
          </div>
        </div>
      </nav>
  </header>
    );
  }
}

export default Header;
