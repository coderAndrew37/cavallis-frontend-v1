import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, fetchUser } = useAuth();

  useEffect(() => {
    // If the user is not authenticated, attempt to fetch the user data
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  // If the user is still null after fetching, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
