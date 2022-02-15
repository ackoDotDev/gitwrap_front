import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "contexts/UserContext";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import Auth from "components/Auth/Auth";
import FindUser from "hooks/User/FindUser";
import AdminLayout from "layouts/Admin.js";

function App() {
  const { user, setUser, isLoading, setLoading } = FindUser();

  return (
    <div>
      <BrowserRouter>
      <UserContext.Provider value={{ user, setUser,isLoading, setLoading }}>
        <Switch>
          <Route exact path="/auth/github/callback" component={Auth} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect to="/admin/dashboard" />
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
