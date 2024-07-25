import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
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
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 100;
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
    setCurrentPage(1); // Reset to first page on filter change
  };

  useEffect(() => {
    const { category, minPrice, maxPrice } = queryString.parse(location.search);
    handleFilter({
      category: category ? decodeURIComponent(category) : null,
      minPrice,
      maxPrice,
    });
  }, [location.search]);

  // Get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div className="pagination-container">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
          >
            Next
          </button>
        </div>
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
