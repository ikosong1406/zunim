import React from "react";
import { useLocation } from "react-router-dom";
import "../../styles/client/Order.css";

const Order = () => {
  const location = useLocation();
  const { total = 0, reference = "" } = location.state || {};

  const completionTime = new Date().toLocaleString();
  return (
    <div
      className="homeMain"
      style={{ paddingLeft: 20, paddingRight: 20, minHeight: 500 }}
    >
      <h1 className="shop">Order Complete!</h1>
      <div className="order-complete-section">
        <h3 className="c1">Thank you! 🎉</h3>
        <p className="c2">
          Your order has been received and a confirmation email will be sent to
          you
        </p>
        <div className="order-details">
          <div className="c3">
            <h3>Date</h3>
            <p> {completionTime}</p>
          </div>
          <div className="c3">
            <h3>Total</h3>
            <p> ₦{total.toFixed(2)}</p>
          </div>
          <div className="c3">
            <h3>Reference</h3>
            <p> {reference}</p>
          </div>
          <div className="c3">
            <h3>Payment Method</h3>
            <p> Paystack</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
