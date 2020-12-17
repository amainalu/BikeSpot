import React from "react";
import PaymentComp from "../components/PaymentComp";

const Payment = (props) => {
  //   console.log("Props", props);

  return (
    <div>
      <h1>Hi {props.user.username}</h1>
      <br />
      <h4 style={{ color: "#226325" }}>Pay €15.00 for yout chosen spot here</h4>
      <PaymentComp
        spotId={props.match.params.id}
        userId={props.user._id}
        history={props.history}
      />
    </div>
  );
};

export default Payment;
