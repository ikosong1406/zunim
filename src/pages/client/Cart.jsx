import React, { useContext, useState } from "react";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Cart.css";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Colors from "../../components/Colors";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [location, setLocation] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const navigate = useNavigate();

  const applyCoupon = () => {
    // Example coupon logic
    if (coupon === "ZUN10") {
      setDiscount(0.1); // 10% discount
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code");
    }
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    switch (selectedLocation) {
      case "Pickup":
        setDeliveryFee(0);
        break;
      case "Iwofe":
      case "Agip":
      case "Wimpy":
      case "Adageorge":
        setDeliveryFee(1500);
        break;
      case "Choba":
      case "Rukpokwu":
      case "Mile 1":
      case "Rumola":
        setDeliveryFee(2500);
        break;
      default:
        setDeliveryFee(0);
    }
  };

  const totalWithoutDiscount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalWithDiscount =
    totalWithoutDiscount - totalWithoutDiscount * discount;
  const total = totalWithDiscount + deliveryFee;

  const handleCheckout = () => {
    if (!location) {
      toast.error("Please select a location before checkout.");
      return;
    }
    // Navigate to checkout page with cart details
    navigate("/checkout", {
      state: { cartItems, total, deliveryFee, discount },
    });
  };

  return (
    <div className="homeMain">
      <ToastContainer />
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
                <th>Details</th>
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
                      src={item.mainImage}
                      alt={item.name}
                      className="cart-product-image"
                    />
                  </td>
                  <td
                    data-label="Color"
                    style={{
                      backgroundColor: item.selectedColor,
                      fontWeight: "600",
                      fontSize: 13,
                      color: Colors.pink,
                    }}
                  >
                    {item.selectedSize}
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
                    ₦{(item.price * item.quantity).toFixed(2)}
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
              onChange={handleLocationChange}
              style={{ marginTop: 10 }}
            >
              <option value="">Select Location</option>
              <option value="Pickup">Pickup - ₦0</option>
              <option value="Iwofe">Iwofe - ₦1500</option>
              <option value="Agip">Agip - ₦1500</option>
              <option value="Wimpy">Wimpy - ₦1500</option>
              <option value="Adageorge">Adageorge - ₦1500</option>
              <option value="Choba">Choba - ₦2500</option>
              <option value="Rukpokwu">Rukpokwu - ₦2500</option>
              <option value="Mile 1">Mile 1 - ₦2500</option>
              <option value="Rumola">Rumola - ₦2500</option>
              {/* Add more locations as needed */}
            </select>
          </div>

          <div style={{ paddingRight: 20, paddingLeft: 17 }}>
            <div className="total-section">
              <div className="delivery">
                <p>Standard Delivery(3 - 5 business days)</p>
                {location && <p> ₦{deliveryFee.toFixed(2)}</p>}
              </div>
              <div className="del">
                <p>Sub Total</p>
                <p> ₦{totalWithoutDiscount.toFixed(2)}</p>
              </div>
              {discount > 0 && (
                <div className="del">
                  <p>Discount</p>
                  <p> ₦{(totalWithoutDiscount * discount).toFixed(2)}</p>
                </div>
              )}

              <div className="del">
                <h3>Total</h3>
                <h3> ₦{total.toFixed(2)}</h3>
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
