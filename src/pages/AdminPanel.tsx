import { useState } from "react";
import Dashboard from "./Dashboard";
import ProductManagement from "./ProductManagement";
import OrderManagement from "./OrderManagement";
import ReviewManagement from "./ReviewManagement";
import UserManagement from "./UserManagement";
import DistributorManagement from "./DistributorManagement";
import Analytics from "./Analytics";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-2">
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Product Management
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Order Management
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "reviews" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Review Management
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("users")}
          >
            User Management
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "distributors" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("distributors")}
          >
            Distributor Management
          </li>
          <li
            className={`p-2 rounded cursor-pointer ${
              activeTab === "analytics" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "products" && <ProductManagement />}
        {activeTab === "orders" && <OrderManagement />}
        {activeTab === "reviews" && <ReviewManagement />}
        {activeTab === "users" && <UserManagement />}
        {activeTab === "distributors" && <DistributorManagement />}
        {activeTab === "analytics" && <Analytics />}
      </main>
    </div>
  );
};

export default AdminPanel;
