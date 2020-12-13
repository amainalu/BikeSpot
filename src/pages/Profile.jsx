import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  render() {
    // console.log(this.props.user._id);

    return (
      <div>
        <h1>Hi {this.props.user.username}</h1>
        <Link to={"/profile/addSpot"}>
          <button type="submit">Add Route</button>
        </Link>
        <br />
        <h3>Your parking spots</h3>
        <br />
        <Link to={"/profile/delete"}>
          <button type="submit">Delete your account</button>
        </Link>
      </div>
    );
  }
}
