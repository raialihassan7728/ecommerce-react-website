

import React from "react";

// Products Data
import { getProducts } from "../data/products";

// Product Card Component
import ProductCard from "../components/ProductCard";

const Home = () => {

  // Getting all products
  const products = getProducts();

  return (

    <div className="page">

      {/* ================= HERO SECTION ================= */}

      <div className="home-hero">

        <h1 className="home-title">
          Welcome to ShopHub
        </h1>

        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>

      </div>


      {/* ================= PRODUCTS SECTION ================= */}

      <div className="container">

        <h2 className="page-title">
          Our Products
        </h2>

        <div className="product-grid">

          {products.map((product) => (

            <ProductCard
              product={product}
              key={product.id}
            />

          ))}

        </div>

      </div>

    </div>
  );
};

export default Home;