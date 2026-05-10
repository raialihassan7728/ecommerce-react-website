

import React from "react";
import { Link } from "react-router-dom";

// Custom cart hook
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {

  // Getting cart functions and cart items
  const { addToCart, cartItems } = useCart();

  // Checking whether product already exists in cart
  const productInCart = cartItems.find(
    (item) => item.id === product.id
  );

  // Showing quantity beside button
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (

    <div className="product-card">

      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />

      <div className="product-card-content">

        {/* Product Name */}
        <h3 className="product-card-name">
          {product.name}
        </h3>

        {/* Product Price */}
        <p className="product-card-price">
          Rs {product.price}
        </p>

        {/* Buttons */}
        <div className="product-card-actions">

          {/* View Details Button */}
          <Link
            className="btn btn-secondary"
            to={`/products/${product.id}`}
          >
            View Details
          </Link>

          {/* Add To Cart Button */}
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart {productQuantityLabel}
          </button>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;