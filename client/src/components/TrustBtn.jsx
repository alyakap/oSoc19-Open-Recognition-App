import React from "react";

function TrustBtn(props) {
  if (props.isTrusted) {
    return (
      <button
        onClick={() => props.breakTrustRelation()}
        className="btn aqua-gradient"
      >
        Break Trust
      </button>
    );
  } else {
    return (
      <div className="p-2 bd-highlight">
        <button type="button" onClick={() => props.establishTrustRelation()} className="btn aqua-gradient">
          Trust
        </button>
      </div>
    );
  }
}

export default TrustBtn;
