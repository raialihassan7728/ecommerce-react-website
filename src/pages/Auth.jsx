import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// Custom Auth Hook
import { useAuth } from "../context/AuthContext";

const Auth = () => {

  // ==============================
  // STATES
  // ==============================

  const [mode, setMode] = useState("signUp");
  const [error, setError] = useState(null);

  // Navigation Hook
  const navigate = useNavigate();

  // Auth Functions
  const { signUp, login } = useAuth();


  // ==============================
  // REACT HOOK FORM
  // ==============================

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // ==============================
  // FORM SUBMIT
  // ==============================

  function onSubmit(data) {

    setError(null);

    let result;

    // Signup Mode
    if (mode === "signUp") {

      result = signUp(
        data.email,
        data.password
      );

    } else {

      // Login Mode
      result = login(
        data.email,
        data.password
      );
    }

    // Success
    if (result.success) {

      navigate("/");

    } else {

      // Error
      setError(result.error);
    }
  }


  // ==============================
  // JSX
  // ==============================

  return (

    <div className="page">

      <div className="container">

        <div className="auth-container">

          {/* Heading */}
          <h1 className="page-title">

            {mode === "signUp"
              ? "Sign Up"
              : "Login"}

          </h1>


          {/* Form */}
          <form
            className="auth-form"
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* Error Message */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}


            {/* ================= EMAIL ================= */}

            <div className="form-group">

              <label
                className="form-label"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className="form-input"
                type="email"
                id="email"

                {...register("email", {
                  required: "Email is required",
                })}
              />

              {errors.email && (
                <span className="form-error">
                  {errors.email.message}
                </span>
              )}

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="form-group">

              <label
                className="form-label"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="form-input"
                type="password"
                id="password"

                {...register("password", {

                  required:
                    "Password is required",

                  minLength: {
                    value: 6,
                    message:
                      "Password must be atleast 6 characters",
                  },

                  maxLength: {
                    value: 12,
                    message:
                      "Password must be less than 12 characters",
                  },
                })}
              />

              {errors.password && (
                <span className="form-error">
                  {errors.password.message}
                </span>
              )}

            </div>


            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-large"
            >
              {mode === "signUp"
                ? "Sign Up"
                : "Login"}
            </button>

          </form>


          {/* ================= SWITCH AUTH MODE ================= */}

          <div className="auth-switch">

            {mode === "signUp" ? (

              <p>
                Already have an account?

                <span
                  className="auth-link"
                  onClick={() =>
                    setMode("login")
                  }
                >
                  Login
                </span>
              </p>

            ) : (

              <p>
                Don't have an account?

                <span
                  className="auth-link"
                  onClick={() =>
                    setMode("signUp")
                  }
                >
                  Sign Up
                </span>
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Auth;