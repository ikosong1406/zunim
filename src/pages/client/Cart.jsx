import React, { useContext, useState } from "react";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Cart.css";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [location, setLocation] = useState("");
  const deliveryFee = 5.0; // Example delivery fee
  const navigation = useNavigate();

  const applyCoupon = () => {
    // Example coupon logic
    if (coupon === "ZUN10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const totalWithoutDiscount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalWithDiscount =
    totalWithoutDiscount - totalWithoutDiscount * discount;
  const total = totalWithDiscount + (location ? deliveryFee : 0);

  const handleCheckout = () => {
    // Navigate to checkout page with cart details
    navigation("/checkout", {
      state: { cartItems, total, deliveryFee, discount },
    });
  };

  return (
    <div className="homeMain" style={{ minHeight: 500 }}>
      <h1 className="shop">Cart</h1>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>No products in the cart.</p>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Sub Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td data-label="Product">{item.name}</td>
                  <td data-label="Image">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-product-image"
                    />
                  </td>
                  <td data-label="Quantity">
                    <button
                      onClick={() => updateQuantity(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => updateQuantity(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </td>
                  <td data-label="Sub Price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td data-label="Action">
                    <CiTrash
                      onClick={() => removeFromCart(item)}
                      style={{ fontSize: 20, color: "red" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="coupon-section">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
          <div className="location-section">
            <label>Shipping:</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{ marginTop: 10 }}
            >
              <option value="">Select Location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              {/* Add more locations as needed */}
            </select>
          </div>

          <div style={{ paddingRight: 20, paddingLeft: 20 }}>
            <div className="total-section">
              <div className="delivery">
                <p>Express Delivery</p>
                {location && <p> ${deliveryFee.toFixed(2)}</p>}
              </div>
              <div className="del">
                <p>Sub Total</p>
                <p> ${totalWithoutDiscount.toFixed(2)}</p>
              </div>
              {discount > 0 && (
                <div className="del">
                  <p>Discount</p>
                  <p> ${(totalWithoutDiscount * discount).toFixed(2)}</p>
                </div>
              )}

              <div className="del">
                <h3>Total</h3>
                <h3> ${total.toFixed(2)}</h3>
              </div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
