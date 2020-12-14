import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { response } from "../../../server/routes/payment";

export default class Profile extends Component {
  state = {
    transactionData: [],
  };

  componentDidMount = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        // console.log(response.data.allTrans);
        this.setState({
          transactionData: response.data.allTrans,
        });
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    // console.log(this.props.user._id);

    return (
      <div>
        <br />
        <h1>Hi {this.props.user.username},</h1>
        <br />
        <div>
          <h2>Your booked spaces</h2>
          {this.state.transactionData.map((el) => {
            return (
              <div className="yourSpot" key={el.transSpot.name}>
                <h3>{el.transSpot.name} </h3>
                <p>{el.transSpot.address}</p>
                <p>Transaction date: {el.date}</p>
                <Link to={`/profile/changeSpot/${el.transSpot._id}`}>
                  <button className="button__submit" type="submit">
                    Change your spot
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
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
