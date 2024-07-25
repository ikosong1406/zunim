import React, { useContext, useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Product.css";
import products from "../../components/DummyData";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product || products.find((p) => p.id === id);
  const { addToCart, cartItems, updateQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(0);
    }

    // Find 5 random similar products
    const findSimilarProducts = () => {
      const filteredProducts = products.filter(
        (p) => p.category === product.category && p.id !== product.id
      );
      const shuffledProducts = filteredProducts.sort(() => 0.5 - Math.random());
      return shuffledProducts.slice(0, 3);
    };
    setSimilarProducts(findSimilarProducts());
  }, [cartItems, product.id, product.category]);

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
      <h1 className="shop">Product Details</h1>
      <div className="product-details">
        <div className="productImagediv">
          <img
            src={product.mainImage}
            alt={product.name}
            className="product-image"
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: -30,
            }}
          >
            {product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="image"
                style={{ width: "25%" }}
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-about">{product.about}</p>
          <h3 className="product-price">₦{product.price.toFixed(2)}</h3>
          <h3 className="product-description">Description</h3>
          <p className="product-descript">{product.description}</p>
          <p className="product-category">{product.category}</p>
          <div className="product-colors">
            <h3 style={{ marginRight: 10, fontSize: 14 }}>Available colors:</h3>
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
      <div className="sim">
        <h2>Similar Products</h2>
        <div className="similar-products">
          {similarProducts.map((similarProduct) => (
            <Link
              to={`/product/${similarProduct.id}`}
              state={{ product: similarProduct }}
              key={similarProduct.id}
              className="product-card2"
            >
              <img
                src={similarProduct.mainImage}
                alt={similarProduct.name}
                className="product-image2"
              />
              <h3>{similarProduct.name}</h3>
              <p>₦{similarProduct.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
