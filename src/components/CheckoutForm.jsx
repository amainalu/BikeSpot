import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
export default function CheckoutForm({ spotId, history }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/payment/${spotId}/create-payment-intent`,
        { items: [{ id: spotId }] },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then(({ data }) => {
        setClientSecret(data.clientSecret);
      });
  }, [spotId]);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // if successful, make an axios call to create a transaction, for a date, spot, for a user)
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/success`,
        { transSpot: spotId },
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      );
      // console.log("data", data);
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        history.push("/profile");
      }, 1000);
    }
  };
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        <strong>
          <span className="green">Payment succeeded!</span>
        </strong>{" "}
      </p>
      <p>You will be re-directed to your profile page.</p>
    </form>
  );
}
