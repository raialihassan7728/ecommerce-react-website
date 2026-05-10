
import React from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

// Products Data Function
import {
  getProductById,
} from "../data/products";

// Custom Cart Hook
import { useCart } from "../context/CartContext";

export default function ProductDetails() {

  // ==============================
  // ROUTE PARAMS
  // ==============================

  // Getting id from URL
  // Example:
  // /products/1  --->  id = 1

  const { id } = useParams();


  // ==============================
  // STATES
  // ==============================

  // Product State
  const [product, setProduct] =
    useState(null);


  // ==============================
  // HOOKS
  // ==============================

  // Navigation Hook
  const navigate = useNavigate();

  // Cart Hook
  const {
    addToCart,
    cartItems,
  } = useCart();


  // ==============================
  // FETCH PRODUCT
  // ==============================

  useEffect(() => {

    // Finding product by id
    const foundProduct =
      getProductById(id);


    // If product not found
    if (!foundProduct) {

      // Redirect to Home Page
      navigate("/");

      return;
    }


    // Saving product into state
    setProduct(foundProduct);

  }, [id]);


  // ==============================
  // LOADING STATE
  // ==============================

  // While product is null
  if (!product) {

    return (

      <div className="page">

        <div className="container">

          <h1 className="page-title">
            Loading...
          </h1>

        </div>

      </div>
    );
  }


  // ==============================
  // CHECK PRODUCT IN CART
  // ==============================

  const productInCart =
    cartItems.find(
      (item) => item.id === product.id
    );


  // Showing quantity beside button
  const productQuantityLabel =
    productInCart
      ? `(${productInCart.quantity})`
      : "";


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="page">

      <div className="container">

        <div className="product-detail">


          {/* ================= IMAGE SECTION ================= */}

          <div className="product-detail-image">

            <img
              src={product.image}
              alt={product.name}
            />

          </div>


          {/* ================= CONTENT SECTION ================= */}

          <div className="product-detail-content">

            {/* Product Name */}
            <h1 className="product-detail-name">
              {product.name}
            </h1>


            {/* Product Price */}
            <p className="product-detail-price">

              Rs {product.price}

            </p>


            {/* Product Description */}
            <p className="product-detail-description">

              {product.description}

            </p>


            {/* Add To Cart Button */}
            <button
              className="btn btn-primary"
              onClick={() =>
                addToCart(product.id)
              }
            >
              Add to Cart{" "}
              {productQuantityLabel}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}