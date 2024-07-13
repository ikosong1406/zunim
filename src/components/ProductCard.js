import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "../styles/client/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </Link>
      <button
        className={`add-to-cart-button ${added ? "added" : ""}`}
        onClick={handleAddToCart}
        disabled={added}
      >
        {added ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
