import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/admin/Allproduct.css";
import Colors from "../../components/Colors";
import axios from "axios";
import api from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProductDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { product } = state || {};

  const [productDetails, setProductDetails] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = async () => {
    const data = {
      productId: product._id,
      name: productDetails.name,
      about: productDetails.about,
      description: productDetails.description,
      price: Number(productDetails.price),
      category: productDetails.category,
      vendor: productDetails.vendor,
      isBestSeller: productDetails.isBestSeller,
      isNewArrival: productDetails.isNewArrival,
    };

    try {
      // Replace with your backend API endpoint
      const response = await axios.post(`${api}/updateProduct`, data);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async () => {
    const data = {
      productId: product._id,
    };

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        // Replace with your backend API endpoint
        const response = await axios.post(`${api}/deleteProduct`, data);
        navigate("/admin/allProduct");
      } catch (error) {
        toast.error("Failed to delete product. Please try again.");
      }
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <ToastContainer />
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Product Details</h1>
      </div>

      <div
        style={{
          display: "flex",
          padding: 20,
          paddingLeft: 40,
          paddingRight: 40,
          width: "100",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "block", width: "50%", marginTop: -10 }}>
          <h3>Product Name</h3>
          <input
            type="text"
            name="name"
            value={productDetails.name || ""}
            onChange={handleChange}
            placeholder="Product Name"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <h3>About Product</h3>
          <input
            name="about"
            value={productDetails.about || ""}
            onChange={handleChange}
            placeholder="About"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          ></input>
          <h3>Description</h3>
          <textarea
            name="description"
            value={productDetails.description || ""}
            onChange={handleChange}
            placeholder="Description"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
              backgroundColor: "transparent",
              height: 100,
              width: "90%",
              padding: 10,
            }}
          ></textarea>
          <h3>Category</h3>
          <input
            type="text"
            name="category"
            value={productDetails.category || ""}
            onChange={handleChange}
            placeholder="Category"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <h3>Vendor</h3>
          <input
            type="text"
            name="category"
            value={productDetails.vendor || ""}
            onChange={handleChange}
            placeholder="Category"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <h3>Price</h3>
          <input
            type="number"
            name="price"
            value={productDetails.price || ""}
            onChange={handleChange}
            placeholder="Price"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <div className="toggle-buttons" style={{ marginTop: 20 }}>
            <label>
              Best Seller
              <input
                type="checkbox"
                name="isBestSeller"
                checked={productDetails.isBestSeller || false}
                onChange={handleToggle}
              />
            </label>
            <label>
              New Arrival
              <input
                type="checkbox"
                name="isNewArrival"
                checked={productDetails.isNewArrival || false}
                onChange={handleToggle}
              />
            </label>
          </div>
        </div>

        <div style={{ display: "block" }}>
          <img
            src={productDetails.mainImage || ""}
            style={{ marginTop: 0, height: 350 }}
          />
          <div
            style={{
              marginTop: 50,
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "blue",
                border: "none",
                color: Colors.ash,
                borderRadius: 10,
              }}
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "red",
                border: "none",
                color: Colors.ash,
                borderRadius: 10,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductDetails;
