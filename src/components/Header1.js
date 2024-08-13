import React, { useContext } from "react";
import "../styles/client/Header1.css";
import { NavLink } from "react-router-dom";
import Colors from "../components/Colors";
import { FaSearch } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { CartContext } from "./CartContext";

const Header1 = ({ clicked, setClicked }) => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="head1Div1">
      <div className="logoDiv">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1>Zunim.</h1>
        </NavLink>
      </div>

      <NavLink to="/search" className="authLinks">
        <FaSearch className="search" />
        <p>Search for products, brands and categories</p>
      </NavLink>

      <div className="head1Div2">
        <NavLink to="/shop">
          <FaShop className="ico11" />
        </NavLink>
        <NavLink style={{ textDecoration: "none", display: "flex" }} to="/cart">
          <FaCartPlus className="ico11" />
          <span
            style={{
              fontWeight: "600",
              alignSelf: "center",
              fontSize: 17,
              marginLeft: 5,
              color: Colors.ash,
            }}
          >
            {cartItems.length}
          </span>
        </NavLink>
        <NavLink to="/about">
          <FaUser className="ico11" />
        </NavLink>
        <NavLink to="/tracking">
          <FaTruckFast className="ico11" />
        </NavLink>
      </div>
    </div>
  );
};

export default Header1;
