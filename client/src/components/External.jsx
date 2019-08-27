import React, { Component } from "react";
import ExternalUserForm from "./ExternalUserForm";
import MyProfile from "./MyProfile";
class Exteranl extends Component {
  constructor() {
    super();
    this.state = {
      toUserInfo: {},
      linkInfo: {},
      isloaded: false
    };
  }
  componentDidMount = () => {
    this.getData();
  };

  //Get user's info who want to show/edit his/her profile based on the endpoint value
  getData = async () => {
    const userInfo = await fetch(
      `/api/links/link/${this.props.location.pathname.split("/")[2]}`
    );
    const userData = await userInfo.json();

    // Get link Info based on endpoint value
    const linkInfo = await fetch(
      `/api/links/${this.props.location.pathname.split("/")[2]}`
    );
    const linkdata = await linkInfo.json();

    this.setState({ toUserInfo: userData, linkInfo: linkdata, isloaded: true });
  };

  // View user profile for external users
  viewUserProfile = () => {
    return <MyProfile userId={this.state.toUserInfo.id} isExternal={true} />;
  };

  // View external form for external users
  viewExternalForm = () => {
    return <ExternalUserForm toUserInfo={this.state.toUserInfo} />;
  };

  //Which view to view to external user
  checkIfViewMode = () => {
    return this.state.linkInfo.is_view_mode
      ? this.viewUserProfile()
      : this.viewExternalForm();
  };
  render() {
    return this.state.isloaded ? this.checkIfViewMode() : <div>loading...</div>;
  }
}
export default Exteranl;
