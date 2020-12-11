import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import "./PaymentComp.css";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
  "pk_test_51Hx6DnCeJH0vCsE1Em7XJWiIwjLJNY44hPhuC9dNdWsE5Oq5xpbrSmoOrMNGcGa4JyMT2S5kTwND3GObTuKhogEM00wgZ8Vaye"
);
export default function App() {
  return (
    <div className="App">
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
