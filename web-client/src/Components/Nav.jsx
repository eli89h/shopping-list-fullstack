import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

function Nav() {
  const location = useLocation();

  return (
    <div className="navbar">
      {location.pathname === "/profile" && (
        <Link className="btn btn-primary" to="/">
          Home
        </Link>
      )}
      {location.pathname === "/" && (
        <Link className="btn btn-primary" to="/profile" excat>
          Profile
        </Link>
      )}
    </div>
  );
}

export default Nav;
