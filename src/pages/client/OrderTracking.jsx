import React, { useState } from "react";
import axios from "axios";
import Colors from "../../components/Colors";
import { FaUser } from "react-icons/fa";
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>
              <strong>Order ID:</strong> {orderDetails._id}
            </p>

            <p
              style={{
                backgroundColor:
                  orderDetails.status === "delivered" ? "green" : "yellow",
                padding: 5,
                borderRadius: 8,
                fontWeight: "500",
                color: orderDetails.status === "delivered" ? "white" : "black",
              }}
            >
              {orderDetails.status}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <p style={{ alignSelf: "center" }}>
              <strong>Date:</strong> {orderDetails.date}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              border: "2px solid #2e3637",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div>
              <FaUser
                style={{
                  fontSize: 20,
                  padding: 5,
                  backgroundColor: Colors.dark,
                  color: Colors.ash,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            </div>
            <div style={{ marginLeft: 10, marginTop: 0 }}>
              <h3>Customer</h3>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${orderDetails.customer.firstName} ${orderDetails.customer.lastName}`}
              </p>
              <p>
                <strong>Email:</strong> {orderDetails.customer.email}
              </p>
              <p>
                <strong>Phone Number:</strong>{" "}
                {orderDetails.customer.phoneNumber}
              </p>
            </div>
          </div>

          <div className="order-products">
            <h3>Products</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Sub Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.products && orderDetails.products.length > 0 ? (
                  orderDetails.products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="cart-product-image"
                        />
                      </td>
                      <td>{product.quantity}</td>
                      <td>₦{(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </tbody>
            </table>
          </div>
          <div
            className="order-summary"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <p>
              <strong>Delivery Fee:</strong> ₦
              {orderDetails.deliveryFee
                ? orderDetails.deliveryFee.toFixed(2)
                : "N/A"}
            </p>
            <p>
              <strong>Sub Total:</strong> ₦
              {orderDetails.subTotal ? orderDetails.subTotal.toFixed(2) : "N/A"}
            </p>
            <p>
              <strong>Discount:</strong> ₦
              {orderDetails.discount ? orderDetails.discount.toFixed(2) : "N/A"}
            </p>
            <p>
              <strong>Total:</strong> ₦
              {orderDetails.total ? orderDetails.total.toFixed(2) : "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
