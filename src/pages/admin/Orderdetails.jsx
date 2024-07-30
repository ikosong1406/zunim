import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/admin/Orderdetails.css";
import Colors from "../../components/Colors";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { BiPrinter } from "react-icons/bi";

const Orderdetails = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const [status, setStatus] = useState(order?.status || "");

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    // Implement save logic here (e.g., API call)
    console.log("Status saved:", status);
  };

  const handlePrintReceipt = () => {
    // Implement print receipt logic here
    window.print();
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="adHomeDiv1">
        <h1
          style={{
            color: Colors.dark,
            marginLeft: 20,
            fontFamily: " Satisfy, cursive",
          }}
        >
          Zunim
        </h1>
      </div>

      {order && (
        <>
          <div className="detailsDiv1">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>

              <p
                style={{
                  backgroundColor:
                    order.status === "delivered" ? "green" : "yellow",
                  padding: 5,
                  borderRadius: 8,
                  fontWeight: "500",
                  color: order.status === "delivered" ? "white" : "black",
                }}
              >
                {order.status}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <p style={{ alignSelf: "center" }}>
                <strong>Date:</strong> {order.date}
              </p>
              <label style={{ alignSelf: "center" }}>
                <strong>Status:</strong>
                <select
                  value={status}
                  onChange={handleStatusChange}
                  style={{ padding: 5, marginLeft: 10 }}
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                </select>
              </label>
              <BiPrinter
                style={{ fontSize: 25, cursor: "pointer", alignSelf: "center" }}
                onClick={handlePrintReceipt}
              />
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: Colors.dark,
                  border: "none",
                  color: Colors.ash,
                  borderRadius: 10,
                  alignSelf: "center",
                }}
              >
                Save
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
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
                    {`${order.customer.firstName} ${order.customer.lastName}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer.email}
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {order.customer.phoneNumber}
                  </p>
                </div>
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
                  <FaShoppingBag
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
                  <h3>Deliver To</h3>
                  <p>
                    <strong>Street:</strong> {order.customer.street}
                  </p>
                  <p>
                    <strong>City:</strong> {order.customer.city}
                  </p>
                  <p>
                    <strong>State:</strong> {order.customer.state}
                  </p>
                  <p>
                    <strong>Zip Code:</strong> {order.customer.zipCode}
                  </p>
                </div>
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
                  <FaShoppingBag
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
                  <h3>Extra</h3>
                  <p>
                    <strong>Special Note:</strong> {order.customer.specialNote}
                  </p>
                </div>
              </div>
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
                  <th>Details</th>
                  <th>Sub Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
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
                    <td style={{ backgroundColor: product.selectedColor }}>
                      {product.selectedSize}
                    </td>
                    <td>₦{(product.price * product.quantity).toFixed(2)}</td>
                  </tr>
                ))}
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
              {order.deliveryFee ? order.deliveryFee.toFixed(2) : "N/A"}
            </p>
            <p>
              <strong>Sub Total:</strong> ₦
              {order.subTotal ? order.subTotal.toFixed(2) : "N/A"}
            </p>
            <p>
              <strong>Discount:</strong> ₦
              {order.discount ? order.discount.toFixed(2) : "N/A"}
            </p>
            <p>
              <strong>Total:</strong> ₦
              {order.total ? order.total.toFixed(2) : "N/A"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Orderdetails;
