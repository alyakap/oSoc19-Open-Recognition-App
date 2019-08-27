import React, { Component } from "react";
import Header from "./Header";
import Badge from "./Badge";
import StatementList from "./StatementList";
import LinkGenerator from "./LinkGenerator";
import Footer from "./Footer";

class MyProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      userId: props.userId || Number(props.location.pathname.split("/")[2]),
      userInfo: {},
      userStatements: [],
      trustedUsersList: [],
      isItMe: false
    };
  }

  componentDidMount = () => {
    this.getUserData();
    this.getUserStatements();
    this.getTrustedUsers();
    this.checkIsItMe();
  };

  // Get specific user's info from the server by id
  getUserData = async () => {
    const response = await fetch(`/api/users/${this.state.userId}`);
    const data = await response.json();
    this.setState({ userInfo: data });
  };

  // Get all statements of specific user using his Id
  getUserStatements = async () => {
    const response = await fetch(`/api/users/${this.state.userId}/statements`);
    const data = await response.json();
    this.setState({ userStatements: data });
  };

  //Get trusted users list of a specific user
  getTrustedUsers = async () => {
    const response = await fetch(
      `/api/users/${this.state.userId}/trustedUsers`
    );
    const data = await response.json();
    this.setState({ trustedUsersList: data });
  };

  checkIsItMe = () => {
    if (Number(localStorage.getItem("id")) === this.state.userId) {
      this.setState({ isItMe: true });
    }
  };

  render() {
    const isExternal =
      this.props.isExternal === undefined ? false : this.props.isExternal;
    return (
      <div className="myProfile">
        <Header />
        <Badge userInfo={this.state.userInfo} showBtn={false} />
        <StatementList
          userStatements={this.state.userStatements}
          trustedUsersList={this.state.trustedUsersList}
          userInfo={this.state.userInfo}
        />
        {!isExternal && this.state.isItMe && (
          <LinkGenerator userId={this.state.userId} />
        )}
        <Footer />
      </div>
    );
  }
}

export default MyProfile;
