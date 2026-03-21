import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@/api/types";

const API_BASE = import.meta.env.VITE_API_URL || "";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  const fetchProfile = async (t: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/profile`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUser(data);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (token) fetchProfile(token);
  }, [token]);

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const loginWithEmail = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || err.message || "Ошибка авторизации");
    }
    const data = await res.json();
    login(data.access_token);
  };

  const signup = async (email: string, password: string, username?: string) => {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || err.message || "Ошибка регистрации");
    }
    const data = await res.json();
    login(data.access_token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (token) await fetchProfile(token);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithEmail, signup, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
