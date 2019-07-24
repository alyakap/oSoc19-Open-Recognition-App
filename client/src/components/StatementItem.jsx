import React, { Component } from "react";

class StatementItem extends Component {
  constructor(props) {
    super();
    this.state = {
      statement: props.statementInfo,
      users: [],
      publisher: {}
    };
  }

  componentDidMount = () => {
    (this.state.statement.from_user_id && this.getPublisherInfo()) ||
      this.getExternalPublisherInfo();
  };

  getPublisherInfo = async () => {
    const data = await fetch(`/api/users/${this.state.statement.from_user_id}`);
    const publisherData = await data.json();
    this.setState({ publisher: publisherData });
    console.log("publ", publisherData);
  };

  getExternalPublisherInfo = async () => {
    const data = await fetch(
      `/api/external-users/${this.state.statement.from_external_user_id}`
    );
    const ExPublisherData = await data.json();
    this.setState({ publisher: ExPublisherData });
    console.log("ExP", ExPublisherData);
  };

  render() {
    const { statement, publisher } = this.state;
    console.log(statement);
    return (
      <>
        <section >
          <div className="media mt-4 px-1">
            <img className="card-img-100 d-flex z-depth-1 mr-3" src={publisher.photo}
              alt="Generic placeholder" />
            <div className="media-body">
              <h5 className="font-weight-bold">{`${publisher.first_name} ${publisher.last_name}`}</h5>
              <h6 className="font-weight-bold teal-text">{publisher.profession}</h6>
              <p>{statement.text}</p>
            </div>
          </div>
        </section>
        <br />
      </>
    );
  }
}

export default StatementItem;
