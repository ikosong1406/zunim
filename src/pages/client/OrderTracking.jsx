import React, { useState } from "react";
import axios from "axios";
import api from "../../Api/BackendApi";
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

    const data = {
      orderId: orderId,
    };

    try {
      const response = await axios.post(`${api}/tracking`, data);
      setOrderDetails(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch order details. Please check the order ID.");
      setOrderDetails(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="homeMain"
      style={{
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 30,
        minHeight: 830,
      }}
    >
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
            {new Date(orderDetails.date).toLocaleDateString()}
          </p>
          <h3>Customer Details:</h3>
          <p>
            <strong>Name:</strong> {orderDetails.customer.firstName}{" "}
            {orderDetails.customer.lastName}
          </p>
          <p>
            <strong>Email:</strong> {orderDetails.customer.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {orderDetails.customer.phoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {orderDetails.customer.street},{" "}
            {orderDetails.customer.city}, {orderDetails.customer.state},{" "}
            {orderDetails.customer.zipCode}
          </p>
          <p>
            <strong>Special Note:</strong> {orderDetails.customer.specialNote}
          </p>
          <h3>Products:</h3>
          <ul>
            {orderDetails.products && orderDetails.products.length > 0 ? (
              orderDetails.products.map((product, index) => (
                <li key={index}>
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    style={{ width: 100, height: 100 }}
                  />
                  <p>
                    <strong>Product:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity.$numberInt}
                  </p>
                  <p>
                    <strong>Price:</strong> ₦
                    {typeof product.price === "number"
                      ? `${product.price.toFixed(2)}`
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Size:</strong> {product.selectedSize}
                  </p>
                  <p>
                    <strong>Color:</strong> {product.selectedColor}
                  </p>
                </li>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </ul>
          <p>
            <strong>Subtotal:</strong> ₦
            {typeof orderDetails.subtotal === "number"
              ? `${orderDetails.subtotal.toFixed(2)}`
              : "N/A"}
          </p>
          <p>
            <strong>Discount:</strong> ₦
            {typeof orderDetails.discount === "number"
              ? `${orderDetails.discount.toFixed(2)}`
              : "N/A"}
          </p>
          <p>
            <strong>Delivery Fee:</strong> ₦
            {typeof orderDetails.deliveryFee === "number"
              ? `${orderDetails.deliveryFee.toFixed(2)}`
              : "N/A"}
          </p>
          <p>
            <strong>Total Price:</strong> ₦
            {typeof orderDetails.total === "number"
              ? `${orderDetails.total.toFixed(2)}`
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
