// src/services/productService.js
import axios from "axios";
import api from "../Api/BackendApi"; // Adjust the path to your API configuration

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${api}/allProducts`);
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
