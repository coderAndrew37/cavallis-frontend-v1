import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/admin"
          className="text-green-500 text-3xl font-bold tracking-wide"
        >
          Cavallis Admin 🌿
        </Link>

        {/* Admin Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-300 font-medium">
          <li>
            <Link to="/admin" className="hover:text-green-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="hover:text-green-400 transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="hover:text-green-400 transition"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-green-400 transition">
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/analytics"
              className="hover:text-green-400 transition"
            >
              Analytics
            </Link>
          </li>
        </ul>

        {/* Logout Button */}
        <button className="text-gray-300 hover:text-green-400 transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
