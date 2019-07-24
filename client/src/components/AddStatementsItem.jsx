import React, { Component } from "react";

class AddStatementItem extends Component {
  constructor() {
    super();
    this.state = {
      statement: ""
    };
  }

  handleChange = event => {
    this.setState({ statement: event.target.value });
    console.log(this.state.statement);
  };

  handleSubmit = event => {
    this.props.addStatement(this.state.statement);
    event.preventDefault();
    this.setState({statement : ""});
    console.log("new statement is added ..");
  };

  render() {
    return (
      <section className="my-5">
        <div className="card card-image" >
          <div className="text-white text-center d-flex align-items-center rgba-teal-strong py-5 px-4">
            <div className="container">
              <form className="text-center border border-light p-5" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <textarea value={this.state.statement} onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="Enter your statement"></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit Statement</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AddStatementItem;
