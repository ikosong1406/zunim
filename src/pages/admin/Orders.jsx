import React from "react";
import Colors from "../../components/Colors";
import { Link } from "react-router-dom";
import orders from "../../components/OrderData";
import "../../styles/admin/Orders.css";
import { FaEdit } from "react-icons/fa";

const Orders = () => {
  // const handleEditClick = (users) => {
  //   navigate(`/admin/orderDetails/${order.id}`, { state: { order } });
  // };

  return (
    <div>
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Orders List</h1>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id.slice(-5)}</td>
                <td>{order.date}</td>
                <td>{`${order.firstName} ${order.lastName}`}</td>
                <td>
                  {" "}
                  <span
                    className={`status-dot ${
                      order.status === "delivered"
                        ? "status-active"
                        : "status-pending"
                    }`}
                  ></span>
                  {order.status}
                </td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <Link
                    to={`/admin/orderDetails/${order.id}`}
                    state={{ order }}
                  >
                    <FaEdit
                      style={{
                        cursor: "pointer",
                        fontSize: 18,
                        color: Colors.ash,
                      }}
                    />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
