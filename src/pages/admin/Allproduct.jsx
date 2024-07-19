// src/pages/admin/AllProduct.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../../components/DummyData";
import "../../styles/admin/Allproduct.css";
import Colors from "../../components/Colors";
import { FaFilter } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const AllProduct = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filterProducts = () => {
    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
    setShowFilterModal(false);
  };

  const resetFilter = () => {
    setSelectedCategory("");
    setFilteredProducts(products);
  };

  const handleAddNewProduct = () => {
    navigate("/admin/addingProduct");
  };

  return (
    <div className="admin-products">
      <div className="adHomeDiv1">
        <h1 style={{ color: Colors.ash, marginLeft: 20 }}>All Products</h1>
      </div>
      <div className="actions">
        <div className="filter-container">
          <h3
            className="filter-button"
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter style={{ alignSelf: "center" }} />
            <span style={{ marginLeft: 5 }}>Filter</span>
          </h3>
        </div>
        <div className="filter-container">
          <h3 className="filter-button" onClick={handleAddNewProduct}>
            <FaPlus style={{ alignSelf: "center" }} />
            <span style={{ marginLeft: 5 }}>Add New Product</span>
          </h3>
        </div>
      </div>
      {showFilterModal && (
        <div className="filter-modal">
          <h2>Filter by Category</h2>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {Array.from(
              new Set(products.map((product) => product.category))
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button onClick={filterProducts}>Apply Filter</button>
          <button onClick={resetFilter}>Reset Filter</button>
          <button onClick={() => setShowFilterModal(false)}>Close</button>
        </div>
      )}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Link
            to={`/admin/allProductDetails/${product.id}`}
            state={{ product }}
            key={product.id}
            className="product-card"
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "20%" }}>
                <img
                  src={product.imageUrl}
                  style={{ width: 100, marginTop: 0 }}
                />
              </div>
              <div style={{ width: "70%" }}>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p> ₦{product.price.toFixed(2)}</p>
              </div>
            </div>
            <h3>Description</h3>
            <p>{product.about}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
