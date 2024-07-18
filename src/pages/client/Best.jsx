import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import products from "../../components/DummyData";
import "../../styles/client/Shop.css";

const Best = () => {
  return (
    <div className="homeMain" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1 className="shop">Best Sellers</h1>
      <div className="homeDiv71">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Best;
