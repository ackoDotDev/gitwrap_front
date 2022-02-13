import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "contexts/UserContext";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Login from "views/Login";
import Auth from "components/Auth/Auth";
import PublicRoute from "components/Routes/PublicRoute";
import PrivateRoute from "components/Routes/PrivateRoute";
import FindUser from "hooks/FindUser/FindUser";

function App() {
  const { user, setUser, isLoading, setLoading } = FindUser();

  return (
    <div>
      <BrowserRouter>
      <UserContext.Provider value={{ user, setUser,isLoading, setLoading }}>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/auth/github/callback" component={Auth} />
          <PrivateRoute />
          <Redirect to="/login" />
        </Switch>
      </UserContext.Provider>
    </BrowserRouter>
    </div>
    
  );
}

export default App;

if (document.getElementById("root")) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
