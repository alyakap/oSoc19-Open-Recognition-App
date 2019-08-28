import React from "react";
import TrustBtn from "./TrustBtn";
import BgImgae from "../img/banner.png";

const Badge = props => {
  const {
    userInfo,
    isTrusted,
    establishTrustRelation,
    breakTrustRelation,
    showBtn
  } = props;

  return (
    <>
      <div
        className="view jarallax"
        data-jarallax={{ speed: 0.2 }}
        style={{
          backgroundImage: "url(" + BgImgae + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="mask rgba-indigo-slight">
          <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="row pt-5 mt-3">
              <div className="col-md-12 mb-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="text-center team-section">
          <div className="row text-center">
            <div className="col-md-12 mb-1" style={{ marginTop: "-100px" }}>
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    {showBtn && props.isDifferentUser && (
                      <TrustBtn
                        establishTrustRelation={establishTrustRelation}
                        breakTrustRelation={breakTrustRelation}
                        isTrusted={isTrusted}/>
                    )}
                  </div>
                  <div className="col-sm">
                    <div className="avatar mx-auto">
                      <img
                        src={userInfo.photo}
                        className="img-fluid rounded-circle z-depth-1"
                        alt="avatar"
                        style={{ width: "230px", height: "230px" }}
                      />
                    </div>
                    <h3 className="my-3 font-weight-bold">
                      <strong>{`${userInfo.first_name} ${
                        userInfo.last_name
                      }`}</strong>
                    </h3>
                    <h6 className="font-weight-bold teal-text mb-4">{`${userInfo.profession}`}</h6>
                  </div>
                  <div className="col-sm" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Badge;
