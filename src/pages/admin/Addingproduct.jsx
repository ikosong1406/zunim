// src/pages/admin/AddingProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AddingProduct.css";

const AddingProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brandName: "",
    about: "",
    description: "",
    category: "",
    price: "",
    reviews: "",
    isBestSeller: false,
    isNewArrival: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // Logic to save the product data
    console.log("Product saved", productData);
    navigate("/admin/allProduct");
  };

  return (
    <div className="adding-product">
      <h1>Add New Product</h1>
      <div className="product-form">
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="brandName"
          value={productData.brandName}
          onChange={handleChange}
          placeholder="Brand Name"
        />
        <textarea
          name="about"
          value={productData.about}
          onChange={handleChange}
          placeholder="About"
        ></textarea>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Description"
        ></textarea>
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          type="number"
          name="reviews"
          value={productData.reviews}
          onChange={handleChange}
          placeholder="Reviews"
        />
        <div className="toggle-buttons">
          <label>
            Best Seller
            <input
              type="checkbox"
              name="isBestSeller"
              checked={productData.isBestSeller}
              onChange={handleChange}
            />
          </label>
          <label>
            New Arrival
            <input
              type="checkbox"
              name="isNewArrival"
              checked={productData.isNewArrival}
              onChange={handleChange}
            />
          </label>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddingProduct;
