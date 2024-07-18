import React, { useState, useContext } from "react";
import "../styles/client/Header1.css";
import { NavLink } from "react-router-dom";
import Colors from "../components/Colors";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "./CartContext";

const Header1 = ({ clicked, setClicked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModal, setProfile] = useState(false);
  const { cartItems } = useContext(CartContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const Profile = () => {
    setProfile(!profileModal);
  };

  return (
    <div className="head1Div1">
      <div className="logoDiv">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h1>Zunim.</h1>
        </NavLink>
      </div>

      <div className="navList">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <h3 className="navItems"> Home</h3>
        </NavLink>
        <NavLink to="/shop" style={{ textDecoration: "none" }}>
          <h3 className="navItems"> Shop</h3>
        </NavLink>
        <NavLink to="/about" style={{ textDecoration: "none" }}>
          <h3 className="navItems"> Contact Us </h3>
        </NavLink>
      </div>

      <div className="authLinks">
        <NavLink
          to="/account"
          style={{ textDecoration: "none", color: Colors.dark }}
        >
          <FaSearch />
        </NavLink>
        <NavLink
          to="/cart"
          style={{ textDecoration: "none", color: Colors.dark }}
        >
          <FaCartPlus />{" "}
          <span
            style={{
              backgroundColor: Colors.ash,
              padding: 2.5,
              borderRadius: 5,
              fontWeight: "500",
              fontSize: 14,
            }}
          >
            {cartItems.length}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header1;
