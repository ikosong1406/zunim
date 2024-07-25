import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../../components/DummyData";
import ProductFilter from "../../components/ProductFilter";
import Modal from "../../components/Modal";
import "../../styles/admin/Allproduct.css";
import Colors from "../../components/Colors";
import { FaFilter } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const AllProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
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

  const handleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  useEffect(() => {
    // Reset filter on mount
    setFilteredProducts(products);
  }, []);

  const handleAddNewProduct = () => {
    navigate("/admin/addingProduct");
  };

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
      <div className="product-grid">
        {currentProducts.map((product) => (
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
                  src={product.mainImage}
                  style={{ width: 100, marginTop: 0 }}
                />
              </div>
              <div style={{ width: "70%", marginLeft: 70 }}>
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
      <Modal show={showFilterModal} onClose={handleFilterModal}>
        <ProductFilter categories={categories} onFilter={handleFilter} />
      </Modal>
    </div>
  );
};

export default AllProduct;
