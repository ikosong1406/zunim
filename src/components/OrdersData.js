// src/services/productService.js
import axios from "axios";
import api from "../Api/BackendApi"; // Adjust the path to your API configuration

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${api}/allOrders`);
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
