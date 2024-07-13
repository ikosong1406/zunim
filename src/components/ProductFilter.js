import React, { useState } from "react";
import "../styles/client/ProductFilter.css";

const ProductFilter = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter({ category: selectedCategory, minPrice, maxPrice });
  };

  return (
    <div className="product-filter">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="0"
        />
      </div>
      <div className="filter-group">
        <label>Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="0"
        />
      </div>
      <button className="filter-button2" onClick={handleFilter}>
        Apply Filter
      </button>
    </div>
  );
};

export default ProductFilter;
