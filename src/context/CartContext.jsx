import React from "react";

import {
  createContext,
  useState,
  useContext,
} from "react";

import { getProductById } from "../data/products";


// Creating Context
export const CartContext = createContext(null);


// ==============================
// CART PROVIDER COMPONENT
// ==============================

export default function CartProvider({ children }) {

  // Cart State
  const [cartItems, setCartItems] = useState([]);




  // ==============================
  // ADD TO CART
  // ==============================

  function addToCart(productId) {

    // Checking if product already exists
    const existing = cartItems.find(
      (item) => item.id === productId
    );

    // If product already exists
    if (existing) {

      const currentQuantity = existing.quantity;

      // Updating quantity
      const updatedCartItems = cartItems.map(
        (item) =>

          item.id === productId

            ? {
                id: productId,
                quantity: currentQuantity + 1,
              }

            : item
      );

      setCartItems(updatedCartItems);

    } else {

      // Adding new product
      setCartItems([
        ...cartItems,
        {
          id: productId,
          quantity: 1,
        },
      ]);
    }
  }



  // ==============================
  // GET CART ITEMS WITH PRODUCTS
  // ==============================

  function getCartItemsWithProducts() {

    return cartItems

      .map((item) => ({

        ...item,

        product: getProductById(item.id),

      }))

      .filter((item) => item.product);
  }



  // ==============================
  // REMOVE FROM CART
  // ==============================

  function removeFromCart(productId) {

    setCartItems(

      cartItems.filter(
        (item) => item.id !== productId
      )
    );
  }



  // ==============================
  // UPDATE QUANTITY
  // ==============================

  function updateQuantity(productId, quantity) {

    // If quantity becomes 0
    if (quantity <= 0) {

      removeFromCart(productId);

      return;
    }

    // Updating quantity
    setCartItems(

      cartItems.map((item) =>

        item.id === productId

          ? { ...item, quantity }

          : item
      )
    );
  }



  // ==============================
  // GET TOTAL PRICE
  // ==============================

  function getCartTotal() {

    const total = cartItems.reduce(

      (total, item) => {

        const product = getProductById(item.id);

        return total +
          (product
            ? product.price * item.quantity
            : 0);
      },

      0
    );

    return total;
  }



  // ==============================
  // CLEAR CART
  // ==============================

  function clearCart() {

    setCartItems([]);
  }



  // ==============================
  // PROVIDER RETURN
  // ==============================

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >

      {children}

    </CartContext.Provider>

  );
}



// ==============================
// CUSTOM CART HOOK
// ==============================

export function useCart() {

  const context = useContext(CartContext);

  return context;
}
