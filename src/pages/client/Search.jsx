import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../components/ProductData";

const Search = () => {
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

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    if (value.length > 2) {
      const lowercasedValue = value.toLowerCase();

      // Filter products
      const productResults = products.filter(
        (product) =>
          product.name && product.name.toLowerCase().includes(lowercasedValue)
      );

      // Filter unique categories
      const categoryResults = [
        ...new Set(products.map((product) => product.category).filter(Boolean)),
      ]
        .filter((category) => category.toLowerCase().includes(lowercasedValue))
        .map((category) => ({ type: "category", name: category }));

      // Filter unique brands
      const brandResults = [
        ...new Set(products.map((product) => product.brand).filter(Boolean)),
      ]
        .filter((brand) => brand.toLowerCase().includes(lowercasedValue))
        .map((brand) => ({ type: "brand", name: brand }));

      setSuggestions([...productResults, ...categoryResults, ...brandResults]);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (suggestion.type === "category") {
      navigate(`/shop`, { state: { category: suggestion.name } });
    } else if (suggestion.type === "brand") {
      navigate(`/shop`, { state: { brand: suggestion.name } });
    } else {
      navigate(`/product/${suggestion._id}`, {
        state: { product: suggestion },
      });
    }
  };

  return (
    <div
      className="homeMain"
      style={{ paddingLeft: 20, paddingRight: 20, height: 830 }}
    >
      <h1 className="shop">Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for products, categories, or brands"
        style={{ border: "1px solid #2e3637", padding: 12, borderRadius: 8 }}
      />
      {suggestions.length > 0 && (
        <div className="suggestions-list" style={{ padding: 10 }}>
          {suggestions.map((suggestion) => (
            <h3
              key={suggestion._id || suggestion.name}
              onClick={() => handleSelectSuggestion(suggestion)}
            >
              {suggestion.name || suggestion.category || suggestion.brand}
            </h3>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
