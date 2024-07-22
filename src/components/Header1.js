import React, { useState, useContext } from "react";
import "../styles/client/Header1.css";
import { NavLink } from "react-router-dom";
import Colors from "../components/Colors";
import { FaSearch } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { FaCartPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
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

      <NavLink to="/search" className="authLinks">
        <FaSearch className="search" />
        <p>Search for products, brands and categories</p>
      </NavLink>

      <div className="head1Div2">
        <FaShop className="ico11" to="/shop" />
        <FaCartPlus className="ico11" to="/cart" />
        <FaUser className="ico11" to="/about" />
      </div>
    </div>
  );
};

export default Header1;
