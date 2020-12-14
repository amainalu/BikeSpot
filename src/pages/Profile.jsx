import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  state = {
    spot: [],
    transaction: {},
  };

  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
      user: this.props.user,
    });
  };

  render() {
    // console.log(this.props.user._id);

    return (
      <div>
        <br />
        <h1>Hi {this.props.user.username},</h1>
        <br />
        <h2>Your booked spaces</h2>
        <hr />
        <br />
        <Link to={"/profile/addSpot"}>
          <button className="button__submit" type="submit">
            Add new parking
          </button>
        </Link>
        <br />
        <br />
        <Link to={"/profile/delete"}>
          <button
            className="button__submit"
            id="redButton"
            style={{ textDecoration: "none" }}
            type="submit"
          >
            Delete your account
          </button>
        </Link>
      </div>
    );
  }
}
