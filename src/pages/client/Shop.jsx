import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import products from "../../components/DummyData";
import ProductFilter from "../../components/ProductFilter";
import Modal from "../../components/Modal";
import "../../styles/client/Shop.css";
import { FaFilter } from "react-icons/fa6";

const Shop = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleFilter = ({ category, minPrice, maxPrice }) => {
    let filtered = products;
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }
    if (minPrice) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(minPrice)
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(maxPrice)
      );
    }
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    if (location.state) {
      const { category, brand } = location.state;
      handleFilter({ category, brand });
    }
  }, [location.state]);

  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1 className="shop">Shop Page</h1>
      <div className="filter-container">
        <h3
          className="filter-button"
          onClick={() => setShowFilterModal(!showFilterModal)}
        >
          <FaFilter style={{ alignSelf: "center" }} />
          <span style={{ marginLeft: 5 }}>Filter</span>
        </h3>
      </div>
      <div className="homeDiv71">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Modal
        show={showFilterModal}
        onClose={() => setShowFilterModal(!showFilterModal)}
      >
        <ProductFilter categories={categories} onFilter={handleFilter} />
      </Modal>
    </div>
  );
};

export default Shop;
