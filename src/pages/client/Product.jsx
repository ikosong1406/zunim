import React, { useContext, useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { CartContext } from "../../components/CartContext";
import "../../styles/client/Product.css";
import { fetchProducts } from "../../components/ProductData"; // Adjust path if needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactStars from "react-rating-stars-component";
import ImageModal from "../../components/ImageModal";

const Product = () => {
  const { _id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart, cartItems, updateQuantity, removeFromCart } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // Fetch data from backend
        setProducts(data); // Store data in state
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const prod =
        location.state?.product || products.find((p) => p._id === _id);
      setProduct(prod);

      // Find 5 random similar products
      if (prod) {
        const findSimilarProducts = () => {
          const filteredProducts = products.filter(
            (p) => p.category === prod.category && p._id !== prod._id
          );
          const shuffledProducts = filteredProducts.sort(
            () => 0.5 - Math.random()
          );
          return shuffledProducts.slice(0, 3);
        };
        setSimilarProducts(findSimilarProducts());
      }
    }
  }, [products, _id, location.state?.product]);

  useEffect(() => {
    if (product) {
      const cartItem = cartItems.find((item) => item._id === product._id);
      if (cartItem) {
        setQuantity(cartItem.quantity);
        setSelectedSize(cartItem.selectedSize);
        setSelectedColor(cartItem.selectedColor);
      } else {
        setQuantity(0);
        setSelectedSize("");
        setSelectedColor("");
      }
    }
  }, [product, cartItems]);

  const handleAddToCart = () => {
    if (
      product.availableColors[1] &&
      product.availableColors[1].length > 0 &&
      !selectedSize
    ) {
      toast.error("Please select a size.");
      return;
    }
    if (
      product.availableColors[0] &&
      product.availableColors[0].length > 0 &&
      !selectedColor
    ) {
      toast.error("Please select a color.");
      return;
    }
    if (quantity === 0 && product) {
      addToCart({ ...product, selectedSize, selectedColor });
      setQuantity(1);
      toast.success("Product added to cart!");
    }
  };

  const handleIncreaseQuantity = () => {
    if (product) {
      updateQuantity(product, quantity + 1);
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (product) {
      if (quantity > 1) {
        updateQuantity(product, quantity - 1);
        setQuantity(quantity - 1);
      } else if (quantity === 1) {
        removeFromCart(product); // Use removeFromCart instead of addToCart
        setQuantity(0);
      }
    }
  };

  const handleRatingChange = (nextValue) => {
    setRating(nextValue);
  };

  const handleSubmitReview = () => {
    if (review.trim() === "") {
      toast.error("Please enter a review.");
      return;
    }
    // Submit the review
    toast.success("Review submitted!");
    setReview("");
    setRating(0);
  };

  const parseJSON = (jsonString, defaultValue) => {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse JSON", e);
      return defaultValue;
    }
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage("");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="homeMain">
      <ToastContainer />
      <h1 className="shop">Product Details</h1>
      <div className="product-details">
        <div className="productImagediv">
          <img
            src={product.mainImage}
            alt={product.name}
            className="product-image"
            onClick={() => handleImageClick(product.mainImage)}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: -30,
            }}
          >
            {product.additionalImages && product.additionalImages.length > 0 ? (
              product.additionalImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Additional ${index}`}
                  style={{ width: "25%", cursor: "pointer" }}
                  onClick={() => handleImageClick(image)}
                />
              ))
            ) : (
              <div> </div>
            )}
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
            <h3 style={{ marginRight: 10, fontSize: 14 }}>Available size:</h3>
            {product.availableColors && product.availableColors.length > 0 ? (
              parseJSON(product.availableColors[1], []).map((color, index) => (
                <span
                  key={index}
                  className={`color ${
                    selectedSize === color ? "selected" : ""
                  }`}
                  style={{ fontWeight: "600" }}
                  onClick={() => setSelectedSize(color)}
                >
                  {color}
                </span>
              ))
            ) : (
              <div>No size available</div>
            )}
          </div>
          <div className="product-colors">
            <h3 style={{ marginRight: 10, fontSize: 14 }}>Available colors:</h3>
            {product.availableColors && product.availableColors.length > 0 ? (
              parseJSON(product.availableColors[0], []).map((color, index) => (
                <span
                  key={index}
                  className={`color ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color, fontWeight: "500" }}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </span>
              ))
            ) : (
              <div>No colors available</div>
            )}
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

        {/* <div className="rating-section">
          <h3>Rating: </h3>
          <ReactStars
            name="rate1"
            starCount={5}
            value={rating}
            onStarClick={handleRatingChange}
          />
        </div>

        <div className="review-section">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <button onClick={handleSubmitReview} className="submit-review-button">
            Submit Review
          </button>
        </div> */}
      </div>
      <div className="sim">
        <h2>Similar Products</h2>
        <div className="similar-products">
          {similarProducts.map((similarProduct) => (
            <Link
              to={`/product/${similarProduct._id}`}
              state={{ product: similarProduct }}
              key={similarProduct._id}
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
      {showModal && (
        <ImageModal imageUrl={modalImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Product;
