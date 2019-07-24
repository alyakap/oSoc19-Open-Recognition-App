import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BgImgae from "../../client/src/img/bg-img.png";

function App() {
  return( 
   
    <>
    <Header />
    <div class="App" style={{backgroundImage: 'url(' + BgImgae + ')',backgroundRepeat: 'no-repeat', backgroundSize: 'cover',backgroundPosition: 'center' }}>
        <div style={{height: '60px'}}></div>
        <div class="mask rgba-gradient d-flex justify-content-center align-items-center">
            <div class="container">
                <div class="row mt-5">
                    <div class="col-md-6 mb-5 mt-md-0 mt-5 text-muted text-center text-md-left">
                        <h1 class="h1-responsive font-weight-bold wow fadeInLeft">Let's build a trustful network</h1>
                        <hr />
                        <h6 class="mb-3 wow fadeInLeft">Be part of the social network that people connect each based on their trust relationship. Let people create your profile and enhance your recognition</h6>
                        <button type="button" class="btn btn-success fadeInLeft wow">Learn more</button>
                    </div>
                    <div class="col-md-6 col-xl-5 mb-4">
                        <div class="card wow fadeInRight">
                          <div class="card-body">
                              <div class="text-center">
                                  <h3 class="text-default">
                                  <i class="fa fa-user text-default"></i> Register:</h3>
                                  <hr />
                              </div>
                              <div class="md-form">
                                  <i class="fa fa-user prefix white-text active"></i>
                                  <input type="text" id="form3" class="white-text form-control" />
                                  <label for="form3" class="active">Your name</label>
                              </div>
                              <div class="md-form">
                                  <i class="fa fa-envelope prefix white-text active"></i>
                                  <input type="email" id="form2" class="white-text form-control" />
                                  <label for="form2" class="active">Your email</label>
                              </div>
                              <div class="md-form">
                                  <i class="fa fa-lock prefix white-text active"></i>
                                  <input type="password" id="form4" class="white-text form-control" />
                                  <label for="form4">Your password</label>
                              </div>
                              <div class="text-center mt-4">
                                  <button type="button" class="btn btn-outline-default waves-effect">Sign up</button>
                                  <hr class="mb-3 mt-4" />
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    <Footer />
</>
  )
}

export default App;
