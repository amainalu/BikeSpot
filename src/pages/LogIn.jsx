import React, { Component } from "react";
import { login } from "../services/auth";
import "./Signup";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    error: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    login(credentials).then((res) => {
      // console.log("THIS", res);
      if (!res.status) {
        //handle this
        this.setState({
          error: res.errorMessage,
        });
        return;
      }
      localStorage.setItem("accessToken", res.data.accessToken);
      this.props.authenticate(res.data.user);
      this.props.history.push("/profile");
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h2>Log In</h2>
        <form onSubmit={this.handleFormSubmission} className="signup__form">
          <label htmlFor="input-username">Username</label>
          <input
            id="input-username"
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />

          <label htmlFor="input-password">Password</label>
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            minLength="8"
          />

          {this.state.error && (
            <div className="error-block">
              <p>There was an error submiting the form:</p>
              <p>{this.state.error}</p>
            </div>
          )}

          <button className="button__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
