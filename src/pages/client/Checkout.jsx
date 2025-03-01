import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../components/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import api from "../../Api/BackendApi";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);
  const publicKey = "pk_live_263aea854a44dc77944c933b7e4d1fd9a7ff04d1";
  // const publicKey = "pk_test_66ef040c02fd43a6c4d5d90d484343f70e99b914";
  const { cartItems, total, deliveryFee, discount } = location.state || {};

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    specialNote: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in contactInfo) {
      setContactInfo((prev) => ({ ...prev, [name]: value }));
    } else if (name in shippingAddress) {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePayment = () => {
    // Check if all fields are filled
    if (
      !contactInfo.firstName ||
      !contactInfo.lastName ||
      !contactInfo.email ||
      !contactInfo.phoneNumber ||
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state
    ) {
      toast.error("Please fill in all fields before proceeding to payment.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: contactInfo.email,
      amount: total * 100, // Paystack expects the amount in kobo
      currency: "NGN",
      callback: (response) => {
        console.log(response);
        if (response.status === "success") {
          axios
            .post(`${api}/createOrders`, {
              firstName: contactInfo.firstName,
              lastName: contactInfo.lastName,
              email: contactInfo.email,
              phoneNumber: contactInfo.phoneNumber,
              street: shippingAddress.street,
              city: shippingAddress.city,
              state: shippingAddress.state,
              zipCode: shippingAddress.zipCode,
              specialNote: shippingAddress.specialNote,
              products: cartItems,
              deliveryFee,
              subTotal: total - deliveryFee + discount,
              discount,
              total,
              paymentReference: response.reference,
            })
            .then(() => {
              clearCart();
              navigate("/order", {
                state: {
                  total: total || 0, // Ensure total is a number
                  reference: response.reference || "", // Ensure reference is a string
                },
              });
            })
            .catch((error) => {
              toast.error("Failed to place order. Please try again.");
            });
        } else {
          toast.error("Payment was not successful. Please try again.");
        }
      },
      onClose: () => {
        toast.warning("Transaction was not completed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <ToastContainer />
      <h1 className="shop">Checkout</h1>
      <div className="checkout-section">
        <h3>Contact Information</h3>
        <input
          type="text"
          name="firstName"
          value={contactInfo.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="lastName"
          value={contactInfo.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
        <input
          type="email"
          name="email"
          value={contactInfo.email}
          onChange={handleInputChange}
          placeholder="Email Address"
        />
        <input
          type="text"
          name="phoneNumber"
          value={contactInfo.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
      </div>
      <div className="checkout-section">
        <h3>Shipping Address</h3>
        <input
          type="text"
          name="street"
          value={shippingAddress.street}
          onChange={handleInputChange}
          placeholder="Street Address"
        />
        <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleInputChange}
          placeholder="Town/City"
        />
        <input
          type="text"
          name="state"
          value={shippingAddress.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        <input
          type="text"
          name="zipCode"
          value={shippingAddress.zipCode}
          onChange={handleInputChange}
          placeholder="Zip Code"
        />
        <input
          type="text"
          name="specialNote"
          value={shippingAddress.specialNote}
          onChange={handleInputChange}
          placeholder="Special Note"
        />
      </div>
      <div className="checkout-section order-summary">
        <h3>Order Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Details</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td style={{ backgroundColor: item.selectedColor }}>
                  {item.selectedSize}
                </td>
                <td>₦{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="delivery">
            <p>Express Delivery</p>
            <p>₦{deliveryFee.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <div className="del">
              <p>Discount</p>
              <p>₦{(total * discount).toFixed(2)}</p>
            </div>
          )}

          <div className="del">
            <h3>Total</h3>
            <h3>₦{total.toFixed(2)}</h3>
          </div>
          <button onClick={handlePayment}>Make Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
