import { createContext, useState, useEffect, ReactNode } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  handleTokenRefresh as refreshToken,
} from "../api/authService";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "distributor";
} | null;

type AuthContextType = {
  user: User;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "admin" | "distributor";
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // ✅ Fixed `null` typing
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        let currentUser = await getCurrentUser();
        if (!currentUser) {
          await refreshToken();
          currentUser = await getCurrentUser();
        }
        setUser(currentUser);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (data: { email: string; password: string }) => {
    const user = await loginUser(data);
    setUser(user);
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role?: "user" | "admin" | "distributor";
  }) => {
    const user = await registerUser(data);
    setUser(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children} {/* ✅ Prevent rendering before auth check */}
    </AuthContext.Provider>
  );
};

export { AuthContext };
