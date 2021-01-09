import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebase.utils";

const Nav = () => {
  const [currentuser, setCurrentuser] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const signingOut = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-primary">
      <div className="container p-4">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="#">
            <strong>facepic</strong>
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Contact
              </Link>
            </li>
          </ul>
          {!user.currentUser && (
            <form className="d-flex">
              <Link className="btn btn-outline-dark m-1" to="/signin">
                Signin
              </Link>
              <Link className="btn btn-outline-dark m-1" to="/register">
                Register
              </Link>
            </form>
          )}
          {user.currentUser && (
            <form className="d-flex">
              <button className="btn btn-outline-dark m-1" onClick={signingOut}>
                Signout
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
