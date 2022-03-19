import axios from "axios";
import React, { useState } from "react";
import getStripe from "../lib/get-stripe";
import { fetchPostJSON } from "../utils/fetchers.ts";

const DonateCheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);
  const goToCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Create Stripe Checkout Session
    const response = await fetchPostJSON("/api/checkout_sessions", {
      amount: donationAmount,
    });
    if (response.statusCode === 500) {
      console.log(response.message);
      return;
    }
    const stripe = await getStripe();
    await stripe.redirectToCheckout({
      sessionId: response.id,
    });
    setLoading(false);
  };
  const handleInputChange = (e) => {
    setDonationAmount(e.target.value);
  };
  return (
    <form onSubmit={goToCheckout}>
      <input
        onChange={handleInputChange}
        value={donationAmount}
        type="range"
        min={5}
        max={50}
        step={5}
      />
      <button type="submit" disabled={loading}>
        Donate {`${donationAmount}`}
      </button>
    </form>
  );
};

export default DonateCheckoutForm;
