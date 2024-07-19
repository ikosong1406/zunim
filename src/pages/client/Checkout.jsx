import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const publicKey = "pk_test_b322ca8ac445cfa42b14c0f6968665ce26dbb284";
  const publicKey = "pk_live_58b0863979a176dc2db30d095620afce8674ddc1";
  const { cartItems, total, deliveryFee, discount } = location.state || {};

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
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
    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: contactInfo.email,
      amount: (total + deliveryFee) * 100, // Paystack expects the amount in kobo
      currency: "NGN",
      callback: (response) => {
        console.log(response);
        if (response.status === "success") {
          navigate("/order-complete", {
            state: {
              cartItems,
              total,
              deliveryFee,
              discount,
              contactInfo,
              shippingAddress,
              reference: response.reference,
            },
          });
        } else {
          alert("Payment was not successful. Please try again.");
        }
      },
      onClose: () => {
        alert("Transaction was not completed.");
      },
    });
    handler.openIframe();
  };

  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
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
          type="tel"
          name="phone"
          value={contactInfo.phone}
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
      </div>
      <div className="checkout-section order-summary">
        <h3>Order Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td> ₦{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="delivery">
            <p>Express Delivery</p>
            <p> ₦{deliveryFee.toFixed(2)}</p>
          </div>
          {discount > 0 && (
            <div className="del">
              <p>Discount</p>
              <p> ₦{(total * discount).toFixed(2)}</p>
            </div>
          )}

          <div className="del">
            <h3>Total</h3>
            <h3> ₦{(total + deliveryFee).toFixed(2)}</h3>
          </div>
          <button onClick={handlePayment}>Make Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
