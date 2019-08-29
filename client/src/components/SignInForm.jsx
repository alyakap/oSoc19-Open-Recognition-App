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
      <>
          <h5 class="card-header default-color white-text text-center py-4">
            <strong>
                <span className="font-weight-bold text-white">Sign In</span>
            </strong>
          </h5>

          <div class="card-body px-lg-5 pt-0">
            <form class="text-center" style={{color: "#757575"}} onSubmit={this.handleSubmit}>
              <div>
                {this.state.isNotFalied && (
                  <p style={{ color: "red" }}>
                    Your username or your password is Not valid..
                  </p>
                )}
              </div>

              <div class="md-form">
                <input 
                  id="materialLoginFormUsername" 
                  class="form-control"
                  type="text"
                  value={this.state.username}
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange} />
              </div>

              <div class="md-form">
                <input 
                  type="password" 
                  id="materialLoginFormPassword" 
                  class="form-control" 
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}/>
              </div>

              <div>
                <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" disabled={!this.validateTheForm()}>Sign in</button>
                <p>Not a member?</p>
                <Link to="/" onClick={() => this.props.switchMode(true)}>
                  Create an account
                </Link>
              </div>
            </form>
            </div>
            
        </>
    );
  }
}

export default withRouter(SignInForm);
