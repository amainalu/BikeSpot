import React from "react";
import PaymentComp from "../components/PaymentComp";

const Payment = (props) => {
  console.log("Props", props);

  return (
    <div>
      {/* <h3>Hi {props.user.username}</h3> */}
      <p>Pay €15.00 for yout chosen spot here.</p>
      <PaymentComp
        spotId={props.match.params.id}
        userId={props.user._id}
        history={props.history}
      />
    </div>
  );
};

export default Payment;
