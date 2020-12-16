import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import MapComp from "../components/MapComp";
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

  changeDateFunction(date) {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(this.date);
  }

  render() {
    // console.log(this.props.user._id);
    // console.log(this.state.transactionData);
    return (
      <div>
        <br />
        <h1>Hi {this.props.user.username},</h1>
        <br />
        <Link to={"/profile/addSpot"} className="link">
          <button className="button__submit" type="submit">
            Add new parking
          </button>
        </Link>
        <br />
        <MapComp userId={this.props.user._id} />
        <hr />
        <br />

        <div>
          <h2>Your purchase history</h2>
          {this.state.transactionData.map((el) => {
            return (
              <div id="yourSpot" key={el.transSpot.name}>
                <h3 className="lessSpaceBetween"> {el.transSpot.name}</h3>
                <h4 className="lessSpaceBetween">
                  Transaction date:
                  {" " + this.changeDateFunction(el.date)}
                </h4>
                <p className="lessSpaceBetween">{el.transSpot.address}</p>
                <p className="lessSpaceBetween">
                  Transaction ammount: {el.ammount}.00€
                </p>
              </div>
            );
          })}
        </div>

        <br />
        <Link to={"/profile/delete"} className="link">
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
