import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Component } from "react";

function Profile2(props) {
  function handleDelete(userID) {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/profile/delete/${userID}`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        localStorage.removeItem("accessToken");
        setTimeout(() => {
          props.history.push("/");
          props.authenticate(null);
        }, 1000);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <div>
      <h1>Hi {props.user.username}</h1>
      <p>You are about to delete your account permanently</p>
      <p>After you submit you will be redirected to the SignUp page</p>
      <p>and your account will be deleted from database</p>
      <br />
      <button type="submit" onClick={() => handleDelete(props.user._id)}>
        Delete your account
      </button>
    </div>
  );
}

class Profile extends Component {
  state = {
    user: this.props.user,
  };

  sayHello = () => {
    const banana = "fuit";
  };

  componentDidMount = () => {};

  handleDelete = (userID) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/profile/delete/${userID}`)
      .then(() => {
        this.setState({
          user: null,
        });
        //   Redirect("./Signup");
      });
  };

  render() {
    // console.log(this.props.user._id);
    return (
      <div>
        <h1>Hi {this.props.user.username}</h1>
        <p>You are about to delete your account permanently</p>
        <p>After you submit you will be redirected to the SignUp page</p>
        <p>and your account will be deleted from database</p>
        <br />
        <button
          type="submit"
          onClick={() => this.handleDelete(this.state.user._id)}
        >
          Delete your account
        </button>
      </div>
    );
  }
}

export default Profile2;
