import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BgImgae from "../../client/src/img/bg-img.jpg";
import Registeration from "../../client/src/components/Registreation";

function App() {
  return (
    <div  style={{
          backgroundImage: "url(" + BgImgae + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "center"
    }}>
      <Header />
      <div
        className="App">
        <div style={{ height: "60px" }} />
        <div className="mask rgba-gradient d-flex justify-content-center align-items-center">
          <div className="container">
            
            <div className="row mt-5">
              <div className="col-md-6 mb-5 mt-md-0 mt-5 text-muted text-center text-md-left">
                
                <h1 className="h1-responsive font-weight-bold wow fadeInLeft">
                  Let's build a trustful network
                </h1>
                <hr />
                <br />
                
                <h4 className="mb-3 wow fadeInLeft">
                  Be part of the social network that people connect each based
                  on their trust relationship. 
                </h4>
                <h4 className="mb-3 wow fadeInLeft">
                  Let people create your profile
                  and enhance your recognition
                </h4>
              </div>
              <div className="col-md-6 col-xl-5 mb-4">
                <div className="card wow fadeInRight">
                  <div>
                    <Registeration />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
