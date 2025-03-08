import { Link } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";

const AdminNavbar = () => {
  const { admin, logout } = useAdminAuth(); // 🔹 Admin Authentication

  return (
    <nav className="bg-gray-900 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/admin" className="text-green-400 text-2xl font-bold">
          Cavallis Admin 🌿
        </Link>

        {/* Admin Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-300 font-medium">
          <li>
            <Link to="/admin" className="hover:text-green-400">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className="hover:text-green-400">
              Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="hover:text-green-400">
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-green-400">
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/analytics" className="hover:text-green-400">
              Analytics
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        {admin && (
          <button onClick={logout} className="text-gray-300 hover:text-red-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
