import React, { useState, useEffect } from "react";
import Colors from "../../components/Colors";
import { Link } from "react-router-dom";
import ordersData from "../../components/OrderData";
import "../../styles/admin/Orders.css";
import { FaEdit } from "react-icons/fa";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const ordersPerPage = 100;

  // Sorting orders by date (newest first)
  useEffect(() => {
    const sortedOrders = [...ordersData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setOrders(sortedOrders);
    setFilteredOrders(sortedOrders);
  }, []);

  // Filter orders based on status and date
  useEffect(() => {
    let filtered = orders;
    if (statusFilter) {
      filtered = filtered.filter((order) =>
        order.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }
    if (dateFilter) {
      filtered = filtered.filter((order) => order.date === dateFilter);
    }
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [statusFilter, dateFilter, orders]);

  // Get current orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredOrders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Orders List</h1>
      </div>

      <div className="filter-container">
        <label>
          Status:
          <input
            type="text"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by status"
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            placeholder="Filter by date"
          />
        </label>
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
            {currentOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id.slice(-5)}</td>
                <td>{order.date}</td>
                <td>{`${order.firstName} ${order.lastName}`}</td>
                <td>
                  <span
                    className={`status-dot ${
                      order.status === "delivered"
                        ? "status-active"
                        : "status-pending"
                    }`}
                  ></span>
                  {order.status}
                </td>
                <td>₦{order.total.toFixed(2)}</td>
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

      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="pagination-container">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage === Math.ceil(filteredOrders.length / ordersPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
