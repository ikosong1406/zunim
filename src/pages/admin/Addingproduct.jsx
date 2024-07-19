import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AddingProduct.css";
import Colors from "../../components/Colors";
import { FaCamera } from "react-icons/fa";

const AddingProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brandName: "",
    about: "",
    description: "",
    category: "",
    price: "",
    mainImage: "",
    additionalImages: [],
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

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setProductData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        mainImage: URL.createObjectURL(file),
      }));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setProductData((prev) => ({
        ...prev,
        additionalImages: [
          ...prev.additionalImages,
          ...files
            .slice(0, 3 - prev.additionalImages.length)
            .map((file) => URL.createObjectURL(file)),
        ],
      }));
    }
  };

  const handleDeleteImage = (index) => {
    if (index === 0) {
      setProductData((prev) => ({
        ...prev,
        mainImage: "",
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.filter(
          (_, i) => i !== index - 1
        ),
      }));
    }
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
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "block", width: "45%", marginTop: -10 }}>
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

        <div style={{ display: "block", width: "45%" }}>
          <div
            style={{
              height: 300,
              border: "2px dashed #2e3637",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              position: "relative",
              width: "100%",
              padding: 5,
            }}
            onClick={() => document.getElementById("main-image-upload").click()}
          >
            {productData.mainImage ? (
              <img
                src={productData.mainImage}
                alt="Main"
                style={{
                  width: "100%",
                  height: 300,
                  objectFit: "fill",
                  marginTop: -5,
                }}
              />
            ) : (
              <FaCamera style={{ fontSize: 50, color: "#2e3637" }} />
            )}
            <input
              type="file"
              id="main-image-upload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleMainImageChange}
            />
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              // flexDirection: "column",
              gap: 10,
            }}
          >
            {productData.additionalImages.map((image, index) => (
              <div
                key={index}
                style={{
                  width: "32%",
                  height: 100,
                  border: "2px dashed #2e3637",
                  position: "relative",
                  cursor: "pointer",
                  padding: 5,
                }}
              >
                <img
                  src={image}
                  alt={`Additional ${index}`}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                    position: "relative",
                    top: -50,
                  }}
                />
                <button
                  onClick={() => handleDeleteImage(index + 1)}
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "none",
                    borderRadius: "50%",
                    width: 25,
                    height: 25,
                    cursor: "pointer",
                    padding: 5,
                    fontWeight: "700",
                    fontSize: 14,
                    color: "red",
                  }}
                >
                  x
                </button>
              </div>
            ))}
            {productData.additionalImages.length < 3 && (
              <div
                style={{
                  width: "32%",
                  height: 100,
                  border: "2px dashed #2e3637",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: 5,
                }}
                onClick={() =>
                  document.getElementById("additional-images-upload").click()
                }
              >
                <FaCamera style={{ fontSize: 30, color: "#2e3637" }} />
                <input
                  type="file"
                  id="additional-images-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  multiple
                  onChange={handleAdditionalImagesChange}
                />
              </div>
            )}
          </div>

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
                padding: "10px 20px",
                cursor: "pointer",
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
