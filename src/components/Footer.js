import React, { useState, useEffect } from "react";
import "../styles/client/Footer.css";
import { NavLink } from "react-router-dom";
import Colors from "../components/Colors";
import { FaTiktok } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footerDiv1">
      <div className="footerDiv2">
        <div className="footerDiv21">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <h1>Zunim.</h1>
          </NavLink>
          <span />
          <h3>Lifestyle Store</h3>
        </div>
        <div className="footerDiv22">
          <NavLink
            to="/market"
            style={{ textDecoration: "none", color: Colors.ash }}
          >
            <h3> Home</h3>
          </NavLink>
          <NavLink
            to="/privacy"
            style={{ textDecoration: "none", color: Colors.ash }}
          >
            <h3> Shop</h3>
          </NavLink>
          <NavLink
            to="/termsofuse"
            style={{ textDecoration: "none", color: Colors.ash }}
          >
            <h3> Contact Us </h3>
          </NavLink>
        </div>
      </div>
      <hr />
      <div className="footerDiv2">
        <div className="footerDiv23">
          <h3 style={{ textDecoration: "none", color: Colors.ash }}>
            Copyright © 2024 Zunim. All Rights Reserved
          </h3>
          <div className="footerDiv231">
            <NavLink
              to="/privacy"
              style={{ textDecoration: "none", color: Colors.ash }}
            >
              <h3> Privacy Policy</h3>
            </NavLink>
            <NavLink
              to="/termsofuse"
              style={{ textDecoration: "none", color: Colors.ash }}
            >
              <h3> Terms of use </h3>
            </NavLink>
          </div>
        </div>
        <div className="footerDiv24">
          <FaFacebook />
          <FaInstagramSquare />
          <FaTiktok />
        </div>
      </div>
    </div>
  );
};

export default Footer;
