import React from "react";
import { Outlet } from "react-router-dom";
import AdminSide from "./AdminSide";
import Header from "./Header";
// import "../styles/admin/Layout.css";

const AdminLayout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <AdminSide />
      </div>
      <div className="page-container">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
