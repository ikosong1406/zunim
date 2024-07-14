import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Product.css";
import products from "../../components/DummyData";

const Product = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, cartItems, updateQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Find the cart item for this product, if it exists
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
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="homeMain">
      <div className="product-details">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-about">{product.about}</p>
          <h3 className="product-price">${product.price.toFixed(2)}</h3>
          <h3 className="product-description">Description</h3>
          <p>{product.description}</p>
          <p className="product-category">{product.category}</p>
          <div className="product-colors">
            <h3 style={{ marginRight: 10 }}>Available colors: </h3>
            {product.availableColors.map((color, index) => (
              <span
                key={index}
                className="color"
                style={{ backgroundColor: color }}
              >
                {color}
              </span>
            ))}
          </div>
          {quantity === 0 ? (
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div className="quantity-controls">
              <button onClick={handleDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncreaseQuantity}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
