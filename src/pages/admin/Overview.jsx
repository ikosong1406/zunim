import React, { useState, useEffect, useRef, memo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import Colors from "../../components/Colors";
import "../../styles/admin/Overview.css";
import SalesChart from "../../components/SalesChart";
import orders from "../../components/OrderData";

const Overview = () => {
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  return (
    <div>
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Dashboard</h1>
      </div>
      <div className="adHomeDiv2">
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Total Orders</p>
            <h2 style={{ color: Colors.ash }}>{orders.length}</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: Colors.pink,
              color: Colors.ash,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Pending Orders</p>
            <h2 style={{ color: Colors.ash }}>{pendingOrders.length}</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: "yellow",
              color: Colors.dark,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Delivered Orders</p>
            <h2 style={{ color: Colors.ash }}>{deliveredOrders.length}</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: "green",
              color: Colors.ash,
              borderRadius: 10,
            }}
          />
        </div>
      </div>

      <div className="adHomeDiv3">
        <SalesChart />
      </div>
    </div>
  );
};

export default Overview;
