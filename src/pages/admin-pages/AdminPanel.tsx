import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/admin-components/AdminNavbar";
import Sidebar from "../../components/admin-components/Sidebar";

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <AdminNavbar />
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <Outlet /> {/* 🔹 Renders child routes (Dashboard, Products, etc.) */}
      </main>
    </div>
  );
};

export default AdminPanel;
