import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Main from "./components/main"
import Login from "./components/login"
import Register from "./components/register"

function App() {
  const [user, setUser] = useState();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  // if there's a user show the message below
  if (user) {
    return (
      <Main user={user}/>
    );
  }
  
  return (
      <Router>
        <Switch>
          <Route path="/register" children={<Register />}/>
          <Route path="/" children={<Login />}/>
        </Switch>
      </Router>
  )
};

export default App;