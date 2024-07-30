import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "../styles/client/ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartItem = cartItems.find((item) => item._id === product._id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }
  }, [cartItems, product._id]);

  const handleAddToCart = () => {
    navigate(`/product/${product._id}`);
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
      <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
        <img
          src={product.mainImage}
          alt={product.name}
          className="product-image2"
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
