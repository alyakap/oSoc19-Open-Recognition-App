import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfile";
import Exteranl from "./External";
import SignInForm from "./SignInForm";
import App from "../App";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/myProfile/:id" component={MyProfile} />
        <Route path="/userProfile/:id" component={UserProfile} />
        <Route path="/userProfileForExternal/:link" component={Exteranl} />
        <Route path="/sign-in" component={SignInForm} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
