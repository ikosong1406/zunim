// src/pages/admin/AllProductDetails.js
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../styles/admin/Allproduct.css";

const AllProductDetails = () => {
  const { state } = useLocation();
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

  const handleSave = () => {
    // Save logic here
    console.log("Product saved", productDetails);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <h1>Product Details</h1>
      <div className="product-details-form">
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="brandName"
          value={productDetails.brandName}
          onChange={handleChange}
          placeholder="Brand Name"
        />
        <textarea
          name="about"
          value={productDetails.about}
          onChange={handleChange}
          placeholder="About"
        ></textarea>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          name="category"
          value={productDetails.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="number"
          name="price"
          value={productDetails.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="reviews"
          value={productDetails.reviews}
          onChange={handleChange}
          placeholder="Reviews"
        />
        <div className="toggle-buttons">
          <label>
            Best Seller
            <input
              type="checkbox"
              name="isBestSeller"
              checked={productDetails.isBestSeller}
              onChange={handleToggle}
            />
          </label>
          <label>
            New Arrival
            <input
              type="checkbox"
              name="isNewArrival"
              checked={productDetails.isNewArrival}
              onChange={handleToggle}
            />
          </label>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AllProductDetails;
