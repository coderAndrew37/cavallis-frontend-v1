import { createContext, useState, useEffect } from "react";
import api from "../api/http";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await api.get("/admin/me");
        setAdmin(data);
      } catch {
        setAdmin(null);
      }
    };
    fetchAdmin();
  }, []);

  const logout = () => {
    api.post("/admin/logout");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
