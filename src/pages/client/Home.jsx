import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/client/Home.css";
import wbottle from "../../images/bottle.jpeg";
import men from "../../images/men.jpeg";
import women from "../../images/women.jpeg";
import phone from "../../images/phone.jpeg";
import blender from "../../images/blender.jpeg";
import sticker from "../../images/sticker.jpeg";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaShippingFast } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import ProductCard from "../../components/ProductCard";
import Colors from "../../components/Colors";
import Swiper from "../../components/Swiper";
import { fetchProducts } from "../../components/ProductData";
import zu1 from "../../images/zu1.jpg";
import zu2 from "../../images/zu2.jpg";
import zu3 from "../../images/zu3.jpg";
import zu4 from "../../images/zu4.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const newArrivals = products
    .filter((product) => product.isNewArrival)
    .slice(0, 4);
  const bestSellers = products
    .filter((product) => product.isBestSeller)
    .slice(0, 8);

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="homeMain">
      <div>
        <Swiper />
      </div>

      <div className="homeDiv3">
        <div className="homeDiv31">
          <h2>Shop By Categories</h2>
        </div>
        <div className="homeDiv32">
          <div onClick={() => handleCategoryClick("Men Fashion")}>
            <div className="homeDiv321">
              <img src={men} alt="me fashion" />
            </div>
            <p>Men Fashion</p>
          </div>
          <div onClick={() => handleCategoryClick("Beauty & Personal care")}>
            <div className="homeDiv321">
              <img src={wbottle} alt="bottle" />
            </div>
            <p>Beauty & Personal care</p>
          </div>
          <div onClick={() => handleCategoryClick("Kitchen & Dinning")}>
            <div className="homeDiv321">
              <img src={blender} alt="bottle" />
            </div>
            <p>Kitchen & Dinning</p>
          </div>
        </div>
        <div className="homeDiv32">
          <div onClick={() => handleCategoryClick("Women Fashion")}>
            <div className="homeDiv321">
              <img src={women} alt="bottle" />
            </div>
            <p>Women Fashion</p>
          </div>
          <div onClick={() => handleCategoryClick("Phone Accessories")}>
            <div className="homeDiv321">
              <img src={phone} alt="bottle" />
            </div>
            <p>Phone Accessories</p>
          </div>
          <div onClick={() => handleCategoryClick("Interior Decoration")}>
            <div className="homeDiv321">
              <img src={sticker} alt="bottle" />
            </div>
            <p>Interior Decoration</p>
          </div>
        </div>
      </div>

      <div className="homeDiv2">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>New Arrivals</h2>
          <Link className="cta2" to="/new">
            See All
          </Link>
        </div>
        <div className="homeDiv21">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="homeDiv7">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Best Sellers</h2>
          <Link className="cta2" to="/best">
            See All
          </Link>
        </div>
        <div className="homeDiv71">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="homeDiv4">
        <div className="homeDiv41"></div>
        <div className="homeDiv42">
          <h4>PROMOTION</h4>
          <h2>Hurry up! 10% OFF</h2>
          <h3>Thousand of lifestyle products waiting for you</h3>
          <Link className="cta">Shop Now</Link>
        </div>
      </div>

      <div className="homeDiv5">
        <div className="homeDiv51">
          <FaShippingFast className="icon" />
          <p>Fast Shipping</p>
        </div>
        <div className="homeDiv51">
          <RiSecurePaymentFill className="icon" />
          <p>Secure Payment </p>
        </div>
        <div className="homeDiv51">
          <FaPhone className="icon" />
          <p>24/7 Support</p>
        </div>
      </div>

      <div className="homeDiv6">
        <h4>NEWSFEED</h4>
        <h2>instagram</h2>
        <h3>follow us on social media for more discount and promotion</h3>
        <a
          href="https://www.instagram.com/zunim.ecomerce?igsh=MWZtOW9zenRsNHUzaA=="
          style={{ textDecoration: "none", color: Colors.dark }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>@zunim.ecomerce</h3>
        </a>

        <div className="homeDiv61">
          <img src={zu1} alt="beads" />
          <img src={zu2} alt="beads" />
          <img src={zu3} alt="beads" />
          <img src={zu4} alt="beads" />
        </div>
      </div>
    </div>
  );
};

export default Home;
