import React, { Component } from "react";
import MyProfile from "./MyProfile";

class ExternalUserForm extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      photo: "",
      trustStatement: "",
      externalUserInfo: {},
      isFormSubmitted: false,
      afterFewSec: false
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
    this.addExternalUser();
    setTimeout(() => {
      this.addExternalStatement();
    }, 1000);
    this.setState({ isFormSubmitted: true });
    setTimeout(() => {
      this.changeAfterFewSeconds();
    }, 4000);
  };

  //Add new external user to external users table
  addExternalUser = async () => {
    const response = await fetch("/api/external-users", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        profession: this.state.profession,
        photo: this.state.photo
      }),
      headers: { "Content-Type": "application/json" }
    });
    const externalUserInfo = await response.json();
    this.setState({ externalUserInfo });
  };

  // add new statement into statements table
  addExternalStatement = async () => {
    await fetch("/api/statements", {
      method: "POST",
      body: JSON.stringify({
        text: this.state.trustStatement,
        date: "17/7/2019",
        fromExternalUserId: this.state.externalUserInfo.id,
        toUserId: this.props.toUserInfo.id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  viewUserProfile = () => {
    return <MyProfile userId={this.props.toUserInfo.id} isExternal={true} />;
  };

  changeAfterFewSeconds = () => {
    this.setState({ afterFewSec: true });
    this.viewFinishedView();
  };

  viewThanksMessage = () => {
    return (
      <header style={{ height: "100px;" }} className="jumbotron">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-10">
              <h1 className="display-4">
                Thank you {`${this.state.firstName}`}{" "}
              </h1>
              <p className="lead">
                You just made a comrubition to the profile. Well done! You will
                be directed to the profile you just contrubitured...
              </p>
              <hr className="my-4" />
              <div className="text-center">
                <div className="spinner-border text-success" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  };

  viewFinishedView = () => {
    return this.state.afterFewSec
      ? this.viewUserProfile()
      : this.viewThanksMessage();
  };

  viewDefualtView = () => {
    return (
      <div className="jumbotron text-center blue-grey lighten-5">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <form
              className="text-center border border-success p-5"
              onSubmit={this.handleSubmit}
            >
              <h4 className="font-weight-bold">
                You're about to add a statement on someone's profile...
              </h4>
              <br />
              <div className="form-row mb-4">
                <div className="col">
                  <input
                    type="text"
                    id="defaultRegisterFormFirstName"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    id="defaultRegisterFormLastName"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <input
                type="email"
                id="emailEnter"
                className="form-control"
                placeholder="Your e-mail address"
                aria-describedby="Email address"
                name="email"
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                id="professionText"
                className="form-control"
                placeholder="Your profession"
                aria-describedby="Profession"
                name="profession"
                onChange={this.handleChange}
              />
              <br />
              <input
                type="text"
                className="form-control"
                id="textForPhoto"
                aria-describedby="Picture"
                name="photo"
                placeholder="Upload your picture"
                onChange={this.handleChange}
              />
              <div className="form-group">
                <hr />
                <p className="text-left">Enter your statement:</p>
                <textarea
                  className="form-control"
                  id="statementTextArea"
                  rows="3"
                  name="trustStatement"
                  onChange={this.handleChange}
                />
              </div>
              <button className="btn blue-gradient btn-rounded">
                Submit <i className="far fa-gem ml-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.state.isFormSubmitted
      ? this.viewFinishedView()
      : this.viewDefualtView();
  }
}

export default ExternalUserForm;
