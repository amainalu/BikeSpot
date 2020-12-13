// import React from "react";
// import { Link, Redirect } from "react-router-dom";
// import axios from "axios";
// import { Component } from "react";

// export default class Profile extends Component {
//   state = {
//     user: this.props.user,
//   };

//   componentDidMount = () => {
//     handleDelete = (userID) => {
//       axios
//         .delete(
//           `${process.env.REACT_APP_SERVER_URL}/profile/delete/${userID}`
//         )
//         .then(() => {
//           this.setState({
//             user: null,
//           });
//           Redirect("./Signup");
//         });
//     };
//   };

//   render() {
//     // console.log(this.props.user._id);
//     return (
//       <div>
//         <h1>Hi {this.props.user.username}</h1>
//         <p>You are about to delete your account permanently</p>
//         <p>After you submit you will be redirected to the SignUp page</p>
//         <p>and your account will be deleted from database</p>
//         <br />
//         <button type="submit" onClick={() => this.handleDelete(this.state.user._id)}>
//           Delete your account
//         </button>
//       </div>
//     );
//   }
// }
