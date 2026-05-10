

import React from "react";

import {
  createContext,
  useState,
  useContext,
} from "react";

// Creating Context
const AuthContext = createContext(null);


// ==============================
// AUTH PROVIDER COMPONENT
// ==============================

export default function AuthProvider({ children }) {

  // Checking if user already exists in localStorage
  const [user, setUser] = useState(

    localStorage.getItem("currentUserEmail")

      ? {
          email: localStorage.getItem("currentUserEmail"),
        }

      : null
  );



  // ==============================
  // SIGN UP FUNCTION
  // ==============================

  function signUp(email, password) {

    // Getting existing users
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Checking duplicate email
    if (users.find((u) => u.email === email)) {

      return {
        success: false,
        error: "Email already exists",
      };
    }

    // Creating new user object
    const newUser = {
      email,
      password,
    };

    // Adding new user to array
    users.push(newUser);

    // Saving updated users array
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    // Saving current logged in user
    localStorage.setItem(
      "currentUserEmail",
      email
    );

    // Updating React state
    setUser({ email });

    return {
      success: true,
    };
  }



  // ==============================
  // LOGIN FUNCTION
  // ==============================

  function login(email, password) {

    // Getting users from localStorage
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    // Finding matching user
    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    // If no matching user found
    if (!user) {

      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Save current logged in user
    localStorage.setItem(
      "currentUserEmail",
      email
    );

    // Update React state
    setUser({ email });

    return {
      success: true,
    };
  }



  // ==============================
  // LOGOUT FUNCTION
  // ==============================

  function logout() {

    // Remove user from localStorage
    localStorage.removeItem(
      "currentUserEmail"
    );

    // Clear React state
    setUser(null);
  }



  // ==============================
  // PROVIDER RETURN
  // ==============================

  return (

    <AuthContext.Provider
      value={{
        signUp,
        login,
        logout,
        user,
      }}
    >

      {children}

    </AuthContext.Provider>

  );
}



// ==============================
// CUSTOM AUTH HOOK
// ==============================

export function useAuth() {

  const context = useContext(AuthContext);

  return context;
}