import React, { Component } from "react";
import Header from "./Header";
import Badge from "./Badge";
import StatementList from "./StatementList";
import AddStatementItem from "./AddStatementsItem";
import Footer from "./Footer";

class UserProfile extends Component {
  constructor(props) {
    super();
    this.state = {
      fromUserId: Number(localStorage.getItem("id")),
      toUserId: Number(props.location.pathname.split("/")[2]),
      toUserInfo: {},
      userStatements: [],
      trustedUsersList: [],
      isTrusted: false,
      isTrustedToAdd: false,
      isDifferentUser: true
    };
  }

  componentDidMount = () => {
    this.getToUserInfo();
    this.checkTrustExitence();
    this.checkTrustPerson();
    this.getUserStatements();
    this.getTrustedUsers();
    this.checkSameUser();
  };

  // Get specific user's info by id
  getToUserInfo = async () => {
    const response = await fetch(`/api/users/${this.state.toUserId}`);
    const data = await response.json();
    this.setState({ toUserInfo: data });
  };

  checkSameUser = () => {
    if (this.state.fromUserId === this.state.toUserId) {
      this.setState({ isDifferentUser: false });
    }
  };

  // Create a Trust relation between two users ( fromUserId to toUserId )
  establishTrustRelation = async () => {
    await fetch("/api/trust-relations", {
      method: "POST",
      body: JSON.stringify({
        fromUserId: this.state.fromUserId,
        toUserId: this.state.toUserId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.checkTrustExitence();
    this.getTrustedUsers();
  };

  // Delete the trust relation between (fromUserId to toUserId)
  breakTrustRelation = async () => {
    await fetch(
      `/api/trust-relations/${this.state.fromUserId}/${this.state.toUserId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    this.checkTrustExitence();
    this.getTrustedUsers();
  };

  // Check if there is a trust relation between fromUserId and toUserId
  checkTrustExitence = async () => {
    const response = await fetch(
      `/api/trust-relations/exist/${this.state.fromUserId}/${
        this.state.toUserId
      }`
    );
    const data = await response.json();
    this.setState({ isTrusted: data });
  };

  // Check if the logged in user is trusted to add statement
  checkTrustPerson = async () => {
    const response = await fetch(
      `/api/trust-relations/exist/${this.state.toUserId}/${
        this.state.fromUserId
      }`
    );
    const data = await response.json();
    this.setState({ isTrustedToAdd: data });
  };

  // Get all statements of specific user using his Id
  getUserStatements = async () => {
    const response = await fetch(
      `/api/users/${this.state.toUserId}/statements`
    );
    const data = await response.json();
    this.setState({ userStatements: data });
  };

  //Get trusted users list of a specific user
  getTrustedUsers = async () => {
    const response = await fetch(
      `/api/users/${this.state.toUserId}/trustedUsers`
    );
    const data = await response.json();
    this.setState({ trustedUsersList: data });
  };

  handleAddStatement = async trustStatemnet => {
    await fetch("/api/statements", {
      method: "POST",
      body: JSON.stringify({
        text: trustStatemnet,
        date: "17/7/2019",
        fromUserId: this.state.fromUserId,
        toUserId: this.state.toUserId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    this.getUserStatements();
  };

  render() {
    const {
      toUserInfo,
      isTrusted,
      userStatements,
      trustedUsersList,
      isDifferentUser,
      isTrustedToAdd
    } = this.state;

    return (
      <div className="user_profile">
        <Header />
        <Badge
          userInfo={toUserInfo}
          establishTrustRelation={this.establishTrustRelation}
          breakTrustRelation={this.breakTrustRelation}
          isTrusted={isTrusted}
          showBtn={true}
          isDifferentUser={isDifferentUser}
        />

        <StatementList
          userStatements={userStatements}
          userInfo={toUserInfo}
          trustedUsersList={trustedUsersList}
        />
        {isDifferentUser &&
          (isTrustedToAdd && (
            <AddStatementItem addStatement={this.handleAddStatement} />
          ))}
        <Footer />
      </div>
    );
  }
}

export default UserProfile;
