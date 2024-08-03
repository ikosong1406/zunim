import React, { useState, useEffect, useRef, memo } from "react";
import { FaShoppingBag } from "react-icons/fa";
import Colors from "../../components/Colors";
import "../../styles/admin/Overview.css";
import SalesChart from "../../components/SalesChart";
import { fetchOrders } from "../../components/OrdersData";

const Overview = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders(); // Fetch data from backend
        setOrders(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    loadOrders();
  }, []);

  const processingOrders = orders.filter(
    (order) => order.status === "processing"
  );
  const shippedOrders = orders.filter((order) => order.status === "shipped");
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  return (
    <div style={{ minHeight: 600 }}>
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
            <p style={{ color: "gray", fontWeight: 500 }}>Processing Orders</p>
            <h2 style={{ color: Colors.ash }}>{processingOrders.length}</h2>
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
            <p style={{ color: "gray", fontWeight: 500 }}>Shipped Orders</p>
            <h2 style={{ color: Colors.ash }}>{shippedOrders.length}</h2>
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
