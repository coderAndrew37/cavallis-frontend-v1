import { createContext, useState, useEffect, ReactNode } from "react";
import api from "../api/http";

// ✅ Define admin type
interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AdminAuthContextType {
  admin: Admin | null;
  logout: () => void;
}

// ✅ Provide default value
const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await api.get<Admin>("/admin/me");
        setAdmin(data);
      } catch {
        setAdmin(null);
      }
    };
    fetchAdmin();
  }, []);

  const logout = async () => {
    try {
      await api.post("/admin/logout");
      setAdmin(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AdminAuthContext.Provider value={{ admin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export { AdminAuthContext };
