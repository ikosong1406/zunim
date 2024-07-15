// src/pages/admin/AllProduct.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../../components/DummyData";
import "../../styles/admin/Allproduct.css";

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
      <h1>All Products</h1>
      <div className="actions">
        <button onClick={() => setShowFilterModal(true)}>Filter</button>
        <button onClick={handleAddNewProduct}>Add New Product</button>
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
            <h3>{product.name}</h3>
            <p>{product.about}</p>
            <p>${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
