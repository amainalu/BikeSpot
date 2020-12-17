import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
// import { Component } from "react";

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
      <br />
      <h2 style={{ color: "red", fontWeight: "bold" }}>
        You are about to delete your account permanently
      </h2>
      <br />
      <p>After you submit, you will be redirected to the Signup page</p>
      <p>and your account will be deleted from our database.</p>
      <img
        src="../../sad_human-removebg-preview.png"
        alt="sad human picture"
        style={{ width: "200px", height: "200px" }}
      />
      <button
        className="button__submit"
        type="submit"
        onClick={() => handleDelete(props.user._id)}
      >
        Delete your account
      </button>
    </div>
  );
}

export default Profile2;
