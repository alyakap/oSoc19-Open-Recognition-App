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
      isFinished: false,
      after5sec: false
    };
  }

  handleSubmit = e => {
    this.addExternalUser();
    setTimeout(() => {
      this.addExternalStatement();
    }, 1000);
    e.preventDefault();
    this.setState({ isFinished: true });
    setTimeout(() => {
      this.changeAfter5second();
      console.log("aftr5sec changes");
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
    console.log(this.state.externalUserInfo);
  };

  // add new statement into statements table
  addExternalStatement = async () => {
    // eslint-disable-next-line
    const response = await fetch("/api/statements", { 
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

  changeAfter5second = () => {
    this.setState({ after5sec: true });
    this.viewFinishedView();
  };

  viewThanksMessage = () => {
    return (
      <header style={{height: '100px;'}} className="jumbotron">
        <div className="container">
          <div className="row justify-content-md-center">
              <div className="col-md-10">
                  <h1 className="display-4">Thank you {`${this.state.firstName}`} </h1>
                  <p className="lead">You just made a comrubition to the profile. Well done! You will be directed to the profile you just contrubitured...</p>
                  <hr className="my-4"/>
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
    return this.state.after5sec
      ? this.viewUserProfile()
      : this.viewThanksMessage();
  };

  handleInputFirstName = e => {
    this.setState({ firstName: e.target.value });
    console.log("firstName", this.state.firstName);
  };

  handleInputLastName = e => {
    this.setState({ lastName: e.target.value });
    console.log("lastName", this.state.lastName);
  };

  handleInputEmail = e => {
    this.setState({ email: e.target.value });
    console.log("email", this.state.email);
  };

  handleInputProfession = e => {
    this.setState({ profession: e.target.value });
    console.log("profession", this.state.profession);
  };

  handleInputPhoto = e => {
    this.setState({ photo: e.target.value });
    console.log("photo", this.state.photo);
  };

  handleInputStatement = e => {
    this.setState({ trustStatement: e.target.value });
    console.log("statement", this.state.trustStatement);
  };

  viewDefualtView = () => {
    return (
      <div className="jumbotron text-center blue-grey lighten-5">  
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <form className="text-center border border-success p-5" onSubmit={this.handleSubmit}>
                <h4 className="font-weight-bold">You're about to add a statement on  someone's profile...</h4><br />
                <div className="form-row mb-4">
                  <div className="col">
                    <input type="text" id="defaultRegisterFormFirstName" className="form-control" placeholder="First name" onChange={this.handleInputFirstName} />
                  </div>
                  <div className="col">
                    <input type="text" id="defaultRegisterFormLastName" className="form-control" placeholder="Last name" onChange={this.handleInputLastName} />
                  </div>
                </div>
                    <input type="email" id="emailEnter" className="form-control" placeholder="Your e-mail address" aria-describedby="Email address" onChange={this.handleInputEmail} />
                    <br />
                    <input type="text" id="professionText" className="form-control" placeholder="Your profession" aria-describedby="Profession" onChange={this.handleInputProfession} />
                  <br />
                    <input type="text" className="form-control" id="textForPhoto" aria-describedby="Picture" placeholder="Upload your picture" onChange={this.handleInputPhoto} />
                  <div className="form-group">
                    <hr />
                    <p className="text-left">Enter your statement:</p>
                    <textarea className="form-control" id="statementTextArea" rows="3" onChange={this.handleInputStatement}></textarea>
                  </div>
                 <button className="btn blue-gradient btn-rounded">Submit <i className="far fa-gem ml-1"></i></button>
              </form>
            </div>
          </div>
        </div>
    );
  };

  render() {
    return this.state.isFinished
      ? this.viewFinishedView()
      : this.viewDefualtView();
  }
}

export default ExternalUserForm;
