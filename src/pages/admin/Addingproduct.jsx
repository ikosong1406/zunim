import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/admin/AddingProduct.css";
import Colors from "../../components/Colors";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import api from "../../Api/BackendApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddingProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    brand: "",
    about: "",
    description: "",
    category: "",
    price: "",
    mainImage: null,
    mainImagePreview: null,
    additionalImages: [],
    additionalImagePreviews: [],
    availableColors: [],
    availableSize: [],
    isBestSeller: false,
    isNewArrival: false,
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
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
        mainImage: file,
        mainImagePreview: URL.createObjectURL(file),
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
          ...files.slice(0, 3 - prev.additionalImages.length),
        ],
        additionalImagePreviews: [
          ...prev.additionalImagePreviews,
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
        mainImage: null,
        mainImagePreview: null,
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        additionalImages: prev.additionalImages.filter(
          (_, i) => i !== index - 1
        ),
        additionalImagePreviews: prev.additionalImagePreviews.filter(
          (_, i) => i !== index - 1
        ),
      }));
    }
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setProductData((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, colorInput.trim()],
      }));
      setColorInput("");
    }
  };

  const handleAddSize = () => {
    if (sizeInput.trim()) {
      setProductData((prev) => ({
        ...prev,
        availableSize: [...prev.availableSize, sizeInput.trim()],
      }));
      setSizeInput("");
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("brand", productData.brand);
    formData.append("about", productData.about);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("isBestSeller", productData.isBestSeller);
    formData.append("isNewArrival", productData.isNewArrival);
    formData.append(
      "availableColors",
      JSON.stringify(productData.availableColors)
    );
    formData.append(
      "availableColors",
      JSON.stringify(productData.availableSize)
    );
    if (productData.mainImage) {
      formData.append("mainImage", productData.mainImage);
    }
    productData.additionalImages.forEach((image) => {
      formData.append("additionalImages", image);
    });

    try {
      const response = await axios.post(`${api}/createProduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Added");
      resetForm();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const resetForm = () => {
    setProductData({
      name: "",
      brand: "",
      about: "",
      description: "",
      category: "",
      price: "",
      mainImage: null,
      mainImagePreview: null,
      additionalImages: [],
      additionalImagePreviews: [],
      availableColors: [],
      availableSize: [],
      isBestSeller: false,
      isNewArrival: false,
    });
  };

  return (
    <div className="product-details-page">
      <ToastContainer />
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
          <h3>Available Colors</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Add Color"
              style={{
                border: "1px solid #2e3637",
                borderRadius: 10,
                cursor: "pointer",
                marginRight: 10,
              }}
            />
            <button
              onClick={handleAddColor}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "blue",
                border: "none",
                color: "white",
                fontWeight: "600",
              }}
            >
              Add
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            {productData.availableColors.map((color, index) => (
              <span key={index} style={{ marginRight: 10 }}>
                {color}
              </span>
            ))}
          </div>
          <h3>Available Size</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="Add Size"
              style={{
                border: "1px solid #2e3637",
                borderRadius: 10,
                cursor: "pointer",
                marginRight: 10,
              }}
            />
            <button
              onClick={handleAddSize}
              style={{
                padding: 10,
                borderRadius: 10,
                backgroundColor: "blue",
                border: "none",
                color: "white",
                fontWeight: "600",
              }}
            >
              Add
            </button>
          </div>
          <div style={{ marginTop: 10 }}>
            {productData.availableSize.map((size, index) => (
              <span key={index} style={{ marginRight: 10 }}>
                {size}
              </span>
            ))}
          </div>

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
            {productData.mainImagePreview ? (
              <img
                src={productData.mainImagePreview}
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
              gap: 10,
            }}
          >
            {productData.additionalImagePreviews.map((image, index) => (
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
            {productData.additionalImagePreviews.length < 3 && (
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
