// BottomTabNavigator.js
import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../styles/client/BottomTabNavigator.css";
import { FaHome } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { CartContext } from "./CartContext";
import Colors from "./Colors";

const BottomTabNavigator = () => {
  const [showNav, setShowNav] = useState(false);
  const { cartItems } = useContext(CartContext);

  return (
    <div className="bottom-tab-navigator">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={() => setShowNav(false)}
        end
      >
        <FaHome className="icon" />
      </NavLink>
      <NavLink
        to="/shop"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={() => setShowNav(false)}
      >
        <FaShop className="icon" />
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={() => setShowNav(false)}
        style={{ display: "flex" }}
      >
        <FaCartPlus className="icon" />
        <p
          style={{
            fontWeight: "600",
            alignSelf: "center",
            fontSize: 18,
            marginLeft: 5,
          }}
        >
          {cartItems.length}
        </p>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active" : "")}
        onClick={() => setShowNav(false)}
      >
        <FaUser className="icon" />
      </NavLink>
    </div>
  );
};

export default BottomTabNavigator;
