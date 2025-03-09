import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Checkout from "./pages/checkout";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// ✅ Import Admin Components
import AdminLayout from "./layouts/AdminLayout";
import AdminRoutes from "./routes/AdminRoutes";
import Dashboard from "./pages/admin-pages/Dashboard";
import ProductManagement from "./pages/admin-pages/ProductManagement";
import OrderManagement from "./pages/admin-pages/OrderMangement";
import UserManagement from "./pages/admin-pages/UserManagement";
import BlogManagement from "./pages/admin-pages/BlogManagement";
import ReviewManagement from "./pages/admin-pages/ReviewManagement";
import DistributorManagement from "./pages/admin-pages/DistributorManagement";
import Analytics from "./pages/admin-pages/Analytics";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🔹 Protected Routes for Logged-In Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* 🔥 Protected Admin Routes */}
        <Route element={<AdminRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="distributors" element={<DistributorManagement />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Route>
      </Routes>

      <Chatbot />
      <Footer />

      {/* ✅ Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
