import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      photo: "",
      email: "",
      login: "",
      password: "",
      profession: "",
      address: ""
    };
  }

  handleChange = e => {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.createNewUser();
  };

  validateTheForm = () => {
    return (
      this.state.firstName.length > 2 &&
      this.state.lastName.length > 2 &&
      this.state.login.length > 2 &&
      this.state.password.length > 6
    );
  };

  // Create a new user profile
  createNewUser = async () => {
    const data = this.state;
    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.props.switchMode(false);
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              placeholder="Enter your first name @Example Jhon"
              name="firstName"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              placeholder="Enter your last name @Example Doe"
              name="lastName"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input
              type="text"
              placeholder="Enter your photo's link"
              name="photo"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>E-Mail Address:</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username @Example Jhon Doe"
              name="login"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Profession:</label>
            <input
              type="text"
              placeholder="Enter your profession @Example Web Developer"
              name="profession"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter your address"
              name="address"
              onChange={this.handleChange}
            />
          </div>

          <div>
            <button disabled={!this.validateTheForm()}>Sign Up</button>
            <Link to="/" onClick={() => this.props.switchMode(false)}>
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
