import { createContext, useContext, useState } from "react";
import api from "../api.js";

const AuthContext = createContext(null);

function getApiErrorMessage(data, fallbackMessage) {
  if (!data || typeof data !== "object") return fallbackMessage;
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }
  if (typeof data.error === "string" && data.error.trim()) {
    return data.error;
  }
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return String(data.errors[0]);
  }
  return fallbackMessage;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  async function login(email, password) {
    const response = await fetch(api("/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(getApiErrorMessage(data, "Invalid email or password"));
    }

    const { accessToken, user } = data;
    if (!accessToken || !user) {
      throw new Error("Invalid email or password");
    }

    persist(accessToken, user);
  }

  async function register(email, password) {
    const response = await fetch(api("/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(getApiErrorMessage(data, "Registration failed"));
    }

    const { accessToken, user } = data;
    if (!accessToken || !user) {
      throw new Error("Registration failed");
    }

    persist(accessToken, user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);  
  }

  function persist(accessToken, user) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(accessToken);
    setUser(user);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Usage: const { user, token, login, register, logout } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}
