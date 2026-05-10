
import React from "react";
import { Link } from "react-router-dom";

// Custom hook from AuthContext
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  // Getting current logged in user and logout function
  const { user, logout } = useAuth();

  return (

    <nav className="navbar">

      <div className="navbar-container">

        {/* ================= LOGO ================= */}

        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        {/* ================= NAVIGATION LINKS ================= */}

        <div className="navbar-links">

          <Link to="/" className="navbar-link">
            Home
          </Link>

          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>

        </div>

        {/* ================= AUTH SECTION ================= */}

        <div className="navbar-auth">

          {/* If user is NOT logged in */}
          {!user ? (

            <div className="navbar-auth-links">

              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>

              <Link to="/auth" className="btn btn-primary">
                Sign Up
              </Link>

            </div>

          ) : (

            /* If user IS logged in */

            <div className="navbar-user">

              <span className="navbar-greeting">
                Hello, {user.email}
              </span>

              <button
                className="btn btn-secondary"
                onClick={logout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  );
};

export default Navbar;