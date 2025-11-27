// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Safe JSON parse helper
  const safeParse = (value) => {
    try {
      if (!value || value === "undefined" || value === "null") return null;
      return JSON.parse(value);
    } catch (err) {
      console.warn("Invalid JSON in localStorage:", value);
      return null;
    }
  };

  const [user, setUser] = useState(() =>
    typeof window !== "undefined"
      ? safeParse(localStorage.getItem("user"))
      : null
  );

  const [token, setToken] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("token") || null : null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedUser = safeParse(localStorage.getItem("user"));
    const savedToken = localStorage.getItem("token");

    setUser(savedUser);
    setToken(savedToken || null);
  }, []);

  const login = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", tokenValue);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
