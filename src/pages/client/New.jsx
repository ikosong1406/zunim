import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../components/ProductData";
import "../../styles/client/Shop.css";

const New = () => {
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

  const newArrivals = products.filter((product) => product.isNewArrival);

  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1 className="shop">New Arrivals</h1>
      <div className="homeDiv71">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default New;
