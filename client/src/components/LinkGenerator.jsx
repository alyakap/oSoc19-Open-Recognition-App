import React, { Component } from "react";

class LinkGenerator extends Component {
  state = {
    viewEndpoint: "",
    EditEndpoint: ""
  };

  // Create a reandom endpoint
  makeEndpoint = length => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  //Create a new link
  handleGenerateLink = async isForView => {
    const response = await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({
        toUserId: this.props.userId,
        endpoint: this.makeEndpoint(20),
        isViewMode: isForView
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = await response.json();
    if (isForView) {
      this.setState({ viewEndpoint: result.endpoint });
    } else {
      this.setState({ EditEndpoint: result.endpoint });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-11">
            <button
              onClick={() => this.handleGenerateLink(true)}
              className="btn btn-outline-default"
            >
              Share you profile...
              <i className="fas fa-external-link-alt pl-1" />
            </button>
            <br />
            <input
              type="text"
              id="generateLink"
              className="form-control col-lg-10"
              value={`http://localhost:3000/userProfileForExternal/${
                this.state.viewEndpoint
              }`}
            />
          </div>

          <div className="col-md-11">
            <button
              onClick={() => this.handleGenerateLink(false)}
              className="btn btn-outline-default"
            >
              Open your profile for non-members
              <i className="fas fa-external-link-alt pl-1" />
            </button>
            <br />
            <input
              type="text"
              id="generateLink"
              className="form-control col-lg-10"
              value={`http://localhost:3000/userProfileForExternal/${
                this.state.EditEndpoint
              }`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LinkGenerator;
