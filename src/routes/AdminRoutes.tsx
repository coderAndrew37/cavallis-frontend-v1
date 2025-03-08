import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AdminRoutes = () => {
  const { user } = useAuth(); // ✅ Get logged-in user from Auth Context

  // ✅ Check if user is an admin
  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
