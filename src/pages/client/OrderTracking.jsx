import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/client/OrderTracking.css"; // Make sure to create this CSS file

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrderDetails(response.data);
    } catch (err) {
      setError("Failed to fetch order details. Please check the order ID.");
      setOrderDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1 className="shop">Order Tracking</h1>
      <form onSubmit={handleTrackOrder} className="order-tracking-form">
        <input
          type="text"
          value={orderId}
          onChange={handleInputChange}
          placeholder="Enter your order ID"
          required
        />
        <button type="submit">Track Order</button>
      </form>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {orderDetails && (
        <div className="order-details">
          <h2>Order ID: {orderDetails._id}</h2>
          <p>
            <strong>Status:</strong> {orderDetails.status}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(orderDetails.orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Customer Name:</strong> {orderDetails.customerName}
          </p>
          <p>
            <strong>Shipping Address:</strong> {orderDetails.shippingAddress}
          </p>
          <h3>Items:</h3>
          <ul>
            {orderDetails.items.map((item, index) => (
              <li key={index}>
                <p>
                  <strong>Product:</strong> {item.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Price:</strong> ₦{item.price.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total Price:</strong> ₦{orderDetails.totalPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
