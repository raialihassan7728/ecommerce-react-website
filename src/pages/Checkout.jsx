
import React from "react";

// Custom Cart Hook
import { useCart } from "../context/CartContext";

export default function Checkout() {

  // Cart Functions
  const {
    getCartItemsWithProducts,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    clearCart,
  } = useCart();

  // Cart Items
  const cartItems =
    getCartItemsWithProducts();

  // Total Price
  const total = getCartTotal();


  // ==============================
  // PLACE ORDER
  // ==============================

  function placeOrder() {

    alert("Successful Order!");

    clearCart();
  }


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="page">

      <div className="container">

        <h1 className="page-title">
          Checkout
        </h1>

        <div className="checkout-container">


          {/* ================= LEFT SIDE ================= */}

          <div className="checkout-items">

            <h2 className="checkout-section-title">
              Order Summary
            </h2>


            {cartItems.map((item) => (

              <div
                className="checkout-item"
                key={item.id}
              >

                {/* Product Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="checkout-item-image"
                />


                {/* Product Details */}
                <div className="checkout-item-details">

                  <h3 className="checkout-item-name">
                    {item.product.name}
                  </h3>

                  <p className="checkout-item-price">
                    Rs {item.product.price} each
                  </p>

                </div>


                {/* Controls */}
                <div className="checkout-item-controls">

                  <div className="quantity-controls">

                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>

                    <span className="quantity-value">
                      {item.quantity}
                    </span>

                    <button
                      className="quantity-btn"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>


                  {/* Item Total */}
                  <p className="checkout-item-total">

                    Rs
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}

                  </p>


                  {/* Remove Button */}
                  <button
                    className="btn btn-secondary btn-small"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="checkout-summary">

            <h2 className="checkout-section-title">
              Total
            </h2>


            <div className="checkout-total">

              <p className="checkout-total-label">
                Subtotal:
              </p>

              <p className="checkout-total-value">
                Rs {total.toFixed(2)}
              </p>

            </div>


            <div className="checkout-total">

              <p className="checkout-total-label">
                Total:
              </p>

              <p className="checkout-total-value checkout-total-final">
                Rs {total.toFixed(2)}
              </p>

            </div>


            {/* Place Order */}
            <button
              className="btn btn-primary btn-large btn-block"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}