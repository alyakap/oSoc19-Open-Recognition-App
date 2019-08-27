import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isNotFalied: false
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
    this.checkIsMember();
    this.restTheForm();
  };

  validateTheForm = () => {
    return this.state.username.length > 2 && this.state.password.length > 5;
  };

  restTheForm = () => {
    this.setState({ username: "", password: "" });
  };

  //Get user's info if he is a member (passing his username and password)
  checkIsMember = async () => {
    await fetch(
      `/api/users/?username=${this.state.username}&password=${
        this.state.password
      }`
    )
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            const user = data;
            this.props.history.push(`myProfile/${user.id}`);
            localStorage.setItem("id", user.id);
          });
        } else {
          this.setState({ isNotFalied: true });
        }
      })
      .catch(err => {
        console.log("Error:", err);
      });
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            {this.state.isNotFalied && (
              <p style={{ color: "red" }}>
                Your username or your password is Not valid..
              </p>
            )}
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={this.state.username}
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={this.state.password}
              name="password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button disabled={!this.validateTheForm()}>Sign In</button>
            <Link to="/" onClick={() => this.props.switchMode(true)}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignInForm);
