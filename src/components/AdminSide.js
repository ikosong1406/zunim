import { useState } from "react";
import "../styles/admin/Sidebar.css";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import Colors from "./Colors";

const AdminSide = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="sideDiv1">
      <div className="sideDiv2">
        <div className="logoDiv">
          <h1 style={{ color: Colors.pink, marginTop: 80 }}>Zunim.</h1>
        </div>
      </div>
      <div className="sideDiv3">
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <MdDashboard className="icon" />
        </NavLink>
        <NavLink
          to="/admin/allProduct"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
          end
        >
          <FaShoppingBag className="icon" />
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setShowNav(false)}
        >
          <FaList className="icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSide;
