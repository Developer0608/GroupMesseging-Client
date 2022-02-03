import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chat from "./component/Chat";
import Header from "./component/Header";
import Signin from "./component/Signin";
 

function Routing() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  )
}

export default Routing;

