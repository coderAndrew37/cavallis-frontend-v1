import { Outlet, Link } from "react-router-dom";
import {
  FaChartPie,
  FaBox,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAdminAuth } from "../hooks/useAdminAuth"; // ✅ Use correct auth hook

const AdminLayout = () => {
  const { admin, logout } = useAdminAuth(); // ✅ Use admin authentication

  if (!admin) {
    return <p className="text-center text-red-500 mt-10">Access Denied</p>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin"
              className="flex items-center space-x-2 hover:text-green-400"
            >
              <FaChartPie /> <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center space-x-2 hover:text-green-400"
            >
              <FaBox /> <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="flex items-center space-x-2 hover:text-green-400"
            >
              <FaClipboardList /> <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center space-x-2 hover:text-green-400"
            >
              <FaUsers /> <span>Users</span>
            </Link>
          </li>
        </ul>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-6 flex items-center space-x-2 text-red-500 hover:text-red-400"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* 🔥 This renders the selected page */}
      </main>
    </div>
  );
};

export default AdminLayout;
