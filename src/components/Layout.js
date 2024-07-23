import React from "react";
import { Outlet } from "react-router-dom";
import BottomTabNavigator from "./BottomTabNavigator";
import "../styles/client/Layout.css";
import { useWindowDimensions } from "./useWindowDimensions";

const Layout = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="layout-container">
      <div className="page-container2">
        <Outlet />
      </div>
      {width <= 925 ? (
        <div className="bottom-tab-container">
          <BottomTabNavigator />
        </div>
      ) : null}
    </div>
  );
};

export default Layout;
