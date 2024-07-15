// src/pages/admin/AddingProduct.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AddingProduct.css";
import Colors from "../../components/Colors";

const AddingProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brandName: "",
    about: "",
    description: "",
    category: "",
    price: "",
    imageUrl: "https://via.placeholder.com/150",
    isBestSeller: false,
    isNewArrival: false,
  });

  const navigate = useNavigate();

  const [productDetails, setProductDetails] = useState({ ...productData });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    // Logic to save the product data
    console.log("Product saved", productData);
    navigate("/admin/allProduct");
  };

  return (
    <div className="product-details-page">
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>Add New Product</h1>
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
            value={productData.name}
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
            value={productData.about}
            onChange={handleChange}
            placeholder="About"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          ></input>
          <h3>Brand Name</h3>
          <input
            type="text"
            name="brandName"
            value={productData.brandName}
            onChange={handleChange}
            placeholder="Brand Name"
            style={{
              border: "1px solid #2e3637",
              borderRadius: 10,
              cursor: "pointer",
            }}
          />
          <h3>Description</h3>
          <textarea
            name="description"
            value={productData.description}
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
            value={productData.category}
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
            value={productData.price}
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
                checked={productData.isBestSeller}
                onChange={handleToggle}
              />
            </label>
            <label>
              New Arrival
              <input
                type="checkbox"
                name="isNewArrival"
                checked={productData.isNewArrival}
                onChange={handleToggle}
              />
            </label>
          </div>
        </div>

        <div style={{ display: "block" }}>
          <img src={productDetails.imageUrl} style={{ marginTop: 0 }} />
          <div
            style={{
              marginTop: 20,
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
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingProduct;
