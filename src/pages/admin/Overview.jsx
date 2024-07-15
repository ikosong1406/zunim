import React, { useState, useEffect, useRef, memo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaFirstOrder } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import Colors from "../../components/Colors";
import "../../styles/admin/Overview.css";
import SalesChart from "../../components/SalesChart";

const Overview = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Dashboard</h1>
      </div>
      <div className="adHomeDiv2">
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Total Orders</p>
            <h2 style={{ color: Colors.ash }}>{numUsers}</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: "blueviolet",
              color: Colors.ash,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Active Orders</p>
            <h2 style={{ color: Colors.ash }}>0</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: "blue",
              color: Colors.ash,
              borderRadius: 10,
            }}
          />
        </div>
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Completed Orders</p>
            <h2 style={{ color: Colors.ash }}>0</h2>
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
        <div className="adHomeDiv21">
          <div className="adHome211">
            <p style={{ color: "gray", fontWeight: 500 }}>Return Orders</p>
            <h2 style={{ color: Colors.ash }}>0</h2>
          </div>
          <FaShoppingBag
            style={{
              fontSize: 30,
              padding: 5,
              backgroundColor: "brown",
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
