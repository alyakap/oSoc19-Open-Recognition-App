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
      <>
      <h5 class="card-header default-color white-text text-center py-4">
            <strong>
                <span className="font-weight-bold text-white">Sign Up</span>
            </strong>
      </h5>
      <div class="card-body px-lg-5 pt-0">
        <form class="text-center" style={{color: "#757575"}} onSubmit={this.handleSubmit}>

          <div class="form-row">
              <div class="col">
                <div class="md-form">
                    <input type="text" placeholder="First Name" class="form-control" onChange={this.handleChange} />
                </div>
              </div>
              <div class="col">
                <div class="md-form">
                    <input type="text" placeholder="Last Name" class="form-control" onChange={this.handleChange} />
                </div>
              </div>
          </div>

          <div class="md-form mt-0">
              <input type="text" placeholder="Profession"  class="form-control" name="profession" onChange={this.handleChange} />
          </div>

          <div class="md-form mt-0">
              <input type="email" placeholder="E-mail Address" class="form-control" name="email"
              onChange={this.handleChange} />
          </div>

          <div class="md-form mt-0">
              <input type="text" placeholder="Profile Image Link"  class="form-control" name="photo" onChange={this.handleChange} />
          </div>

          <div class="md-form mt-0">
              <input type="text" placeholder="Address"  class="form-control" name="address" onChange={this.handleChange} />
          </div>

          <div class="md-form mt-0">
              <input type="text" placeholder="Username"  class="form-control" name="login" onChange={this.handleChange} />
          </div>

          <div class="md-form mt-0">
              <input type="password" placeholder="Password" class="form-control" name="password" onChange={this.handleChange} />
          </div>

          <div>
            <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" disabled={!this.validateTheForm()}>Sign Up</button>
            <Link to="/" onClick={() => this.props.switchMode(false)}>
              I'm already member
            </Link>
          </div>
          
        </form>
      </div>
      </>
    );
  }
}
export default SignUpForm;
