import React, { Component } from "react";

class TrustBtn extends Component {
  state = {};

  handleTrust = () => {
    this.props.establishTrustRelation(
      this.props.fromUserId,
      this.props.toUserId
    );
  };

  handleBreak = () => {
    this.props.breakTrustRelation(this.props.fromUserId, this.props.toUserId);
  };

  turstedView = () => {
    return (
    <button onClick={this.handleBreak} className="btn aqua-gradient">Break Trust</button>
    );
  };

  defaultView = () => {
    console.log();
    return (
      <div className="p-2 bd-highlight">
        <button type="button" onClick={this.handleTrust} className="btn aqua-gradient">Trust!</button>
      </div>
    );
  };

  render() {
    return this.props.isTrusted ? this.turstedView() : this.defaultView();
  }
}

export default TrustBtn;
