import "./App.css";
import React, { useEffect, useState } from "react";
import MainPage from "./Components/MainPage";

import ProfilePage from "./Components/ProfilePage";
import Nav from "./Components/Nav";

import AppContext from "./context/AppContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

function App() {
  const [shopList, setShopList] = useState([]);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    axios
      .get(`https://fitto-api-server.herokuapp.com/items`)
      .then((response) => {
        if (response.data.length === 0) {
          return;
        } else {
          setShopList(response.data);
        }
      });
  }, []);

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          shopList: shopList,
          setShopList: setShopList,

          userProfile: userProfile,
          setUserProfile: setUserProfile,
        }}
      >
        <Router>
          <Nav />
          <Switch>
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" component={MainPage} />
          </Switch>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
