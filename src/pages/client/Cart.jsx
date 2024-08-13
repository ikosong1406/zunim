import React, { useContext, useState } from "react";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Cart.css";
import { useNavigate } from "react-router-dom";
import { CiTrash } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      case "Rumueme":
      case "Rumuodara":
      case "Old Aba Road":
      case "Alakahia":
      case "UST":
      case "Rumuola":
      case "Warri/Benin(Pick Up)":
        setDeliveryFee(2000);
        break;
      case "Choba":
      case "Mile 1":
      case "Garrison":
      case "Golf Estate":
      case "Odili Road":
      case "GRA":
      case "Sars Road":
      case "East West Road":
        setDeliveryFee(2500);
        break;
      case "Igwuruta":
      case "Rukpokwu":
      case "Aluu":
        setDeliveryFee(3000);
        break;
      case "Kaduna(Pick Up)":
      case "Minna(Pick Up)":
      case "Jos(Pick Up)":
        setDeliveryFee(3500);
        break;
      case "South West(Pick Up)":
        setDeliveryFee(3000);
        break;
      case "South West(Door Delivery)":
        setDeliveryFee(5500);
        break;
      case "South South(Pick Up)":
        setDeliveryFee(2000);
        break;
      case "South South(Door Delivery)":
        setDeliveryFee(5000);
        break;
      case "South East(Pick Up)":
        setDeliveryFee(2500);
        break;
      case "South East(Door Delivery)":
        setDeliveryFee(5000);
        break;
      case "Abuja(Pick Up)":
        setDeliveryFee(3000);
        break;
      case "Abuja(Door Delivery)":
        setDeliveryFee(5500);
        break;
      case "Ajah/Sango(Pick Up)":
        setDeliveryFee(3500);
        break;
      case "Ajah/Sango(Door Delivery)":
        setDeliveryFee(6000);
        break;
      case "Ejigbo/Ikorodu(Pick Up)":
        setDeliveryFee(3500);
        break;
      case "Ejigbo/Ikorodu(Door Delivery)":
        setDeliveryFee(6000);
        break;
      case "Enu-ezike/Afikpo(Pick Up)":
        setDeliveryFee(3500);
        break;
      case "Enu-ezike/Afikpo(Door Delivery)":
        setDeliveryFee(6000);
        break;
      case "Abakpa/Gariki(Pick Up)":
        setDeliveryFee(3500);
        break;
      case "Abakpa/Gariki(Door Delivery)":
        setDeliveryFee(6000);
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
              <option value="Pickup">Pickup</option>
              <option value="Iwofe">Iwofe</option>
              <option value="Agip">Agip</option>
              <option value="Wimpy">Wimpy</option>
              <option value="Adageorge">Adageorge</option>
              <option value="UST">UST</option>
              <option value="Alakahia">Alakahia</option>
              <option value="Old Aba Road">Old Aba Road</option>
              <option value="Rumuodara">Rumuodara</option>
              <option value="Rumuola">Rumuola</option>
              <option value="Rumueme">Rumueme</option>
              <option value="Choba">Choba</option>
              <option value="Mile 1">Mile 1</option>
              <option value="Odili Road">Odili Road</option>
              <option value="GRA">GRA</option>
              <option value="Sars Road">Sars Road</option>
              <option value="East West Road">East West Road</option>
              <option value="Garrison">Garrison</option>
              <option value="Golf Estate">Golf Estate</option>
              <option value="Aluu">Aluu</option>
              <option value="Rukpokwu">Rukpokwu</option>
              <option value="Igwuruta">Igwuruta</option>
              <option value="South South(Door Delivery)">
                South South(Door Delivery)
              </option>
              <option value="South South(Pick Up)">South South(Pick Up)</option>
              <option value="South East(Door Delivery)">
                South East(Door Delivery)
              </option>
              <option value="South East(Pick Up)">South East(Pick Up)</option>
              <option value="South West(Door Delivery)">
                South West(Door Delivery)
              </option>
              <option value="South West(Pick Up)">South West(Pick Up)</option>
              <option value="Abuja(Door Delivery)">Abuja(Door Delivery)</option>
              <option value="Abuja(Pick Up)">Abuja(Pick Up)</option>
              <option value="Ajah/Sango(Door Delivery)">
                Ajah/Sango(Door Delivery)
              </option>
              <option value="Ajah/Sango(Pick Up)">Ajah/Sango(Pick Up)</option>
              <option value="Ejigbo/Ikorodu(Door Delivery)">
                Ejigbo/Ikorodu(Door Delivery)
              </option>
              <option value="Ejigbo/Ikorodu(Pick Up)">
                Ejigbo/Ikorodu(Pick Up)
              </option>
              <option value="Enu-ezike/Afikpo(Door Delivery)">
                Enu-ezike/Afikpo(Door Delivery)
              </option>
              <option value="Enu-ezike/Afikpo(Pick Up)">
                Enu-ezike/Afikpo(Pick Up)
              </option>
              <option value="Abakpa/Gariki(Door Delivery)">
                Abakpa/Gariki(Door Delivery)
              </option>
              <option value="Abakpa/Gariki(Pick Up)">
                Abakpa/Gariki(Pick Up)
              </option>
              <option value="Warri/Benin(Pick Up)">Warri/Benin(Pick Up)</option>
              <option value="Kaduna(Pick Up)">Kaduna(Pick Up)</option>
              <option value="Minna(Pick Up)">Minna(Pick Up)</option>
              <option value="Jos(Pick Up)">Jos(Pick Up)</option>
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
