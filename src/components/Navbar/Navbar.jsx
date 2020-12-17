import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav>
      <Link to="/" className="nav__projectName">
        <img
          src="../../../Logo.jpg"
          style={{ width: "120px", height: "70px" }}
          alt="SpotBike logo"
        />
      </Link>
      <h1
        style={{
          fontFamily: "M PLUS Rounded 1c",
          fontSize: "1.8rem",
          marginRight: "2vw",
        }}
      >
        BikeSpot
      </h1>
      <div className="nav__authLinks">
        {props.user ? (
          <>
            {/* <Link to="/protected" className="authLink">
              Protected Page
            </Link> */}
            <button className="nav-logoutbtn" onClick={props.handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth/signup" className="authLink">
              Signup
            </Link>
            <Link to="/auth/login" className="authLink">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
