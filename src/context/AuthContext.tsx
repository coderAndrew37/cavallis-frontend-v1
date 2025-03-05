import { createContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  logoutUser,
  refreshToken,
} from "../api/authService";

// ✅ Define User Type
type User = { id: string; name: string; email: string } | null;

// ✅ Define Auth Context Type
type AuthContextType = {
  user: User;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

// ✅ Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Auth Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true); // ✅ Track loading state

  // 🔹 Try to refresh session on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUser(user);
        } else {
          await refreshToken();
          const refreshedUser = await getCurrentUser();
          setUser(refreshedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false); // ✅ Ensure loading state updates
      }
    };

    fetchUser();
  }, []);

  // 🔹 Login Function
  const login = async (data: { email: string; password: string }) => {
    const user = await loginUser(data);
    setUser(user);
  };

  // 🔹 Register Function
  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const user = await registerUser(data);
    setUser(user); // ✅ Ensure user is updated after registering
  };

  // 🔹 Logout Function
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

export default AuthContext;
