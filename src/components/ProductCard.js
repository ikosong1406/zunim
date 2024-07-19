// src/components/ProductCard.js
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "../styles/client/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (quantity === 0) {
      addToCart(product);
      setQuantity(1);
    }
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(product, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product, quantity - 1);
      setQuantity(quantity - 1);
    } else if (quantity === 1) {
      removeFromCart(product);
      setQuantity(0);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <h3 className="product-names">{product.name}</h3>
        <p className="product-prices">₦{product.price.toFixed(2)}</p>
      </Link>
      {quantity === 0 ? (
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      ) : (
        <div className="quantity-control">
          <button onClick={handleDecreaseQuantity}>-</button>
          <span>{quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
