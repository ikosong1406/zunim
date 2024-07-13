import React from "react";
import { useParams } from "react-router-dom";
import products from "../../components/DummyData";

const Product = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default Product;
