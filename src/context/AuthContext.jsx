import React, { createContext, useContext, useState, useEffect } from "react";

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
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check for admin credentials
      if (email === "admin@unifyr.com" && password === "admin2025") {
        const userData = {
          id: "admin-1",
          name: "Admin",
          email: email,
          role: "admin",
          avatar: null,
        };
        setUser(userData);
        localStorage.setItem("unifyr_user", JSON.stringify(userData));
        return { success: true };
      }

      // Get all registered users from localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("unifyr_registered_users") || "[]"
      );

      // Find user with matching email and password
      const foundUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return {
          success: false,
          error: "Invalid email or password. Please sign up first.",
        };
      }

      // Login successful - create session (exclude password from session)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar || null,
      };

      setUser(userData);
      localStorage.setItem("unifyr_user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prevent admin email signup
      if (email === "admin@unifyr.com") {
        return {
          success: false,
          error: "This email is reserved for admin use only.",
        };
      }

      // Get existing users from localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("unifyr_registered_users") || "[]"
      );

      // Check if email already exists
      const existingUser = registeredUsers.find((u) => u.email === email);
      if (existingUser) {
        return {
          success: false,
          error: "Email already registered. Please login instead.",
        };
      }

      // Create new user (store password for local authentication)
      const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password, // In real app, this would be hashed on backend
        role: "user",
        avatar: null,
        createdAt: new Date().toISOString(),
      };

      // Add to registered users
      registeredUsers.push(newUser);
      localStorage.setItem(
        "unifyr_registered_users",
        JSON.stringify(registeredUsers)
      );

      // Auto-login after signup (exclude password from session)
      const userData = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      };

      setUser(userData);
      localStorage.setItem("unifyr_user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
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
