import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("unifyr_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Call backend API
      const response = await authAPI.login(email, password);

      if (response.success) {
        const userData = {
          ...response.user,
          token: response.token,
        };
        setUser(userData);
        localStorage.setItem("unifyr_user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Login failed. Please try again.",
      };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Call backend API
      const response = await authAPI.register(name, email, password);

      if (response.success) {
        const userData = {
          ...response.user,
          token: response.token,
        };
        setUser(userData);
        localStorage.setItem("unifyr_user", JSON.stringify(userData));
        return { success: true };
      } else {
        return { success: false, error: response.message };
      }
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || "Signup failed. Please try again.",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("unifyr_user");
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const isAdmin = () => {
    return user?.role === "admin";
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("unifyr_user", JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
