import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 p-6 fixed h-screen">
      <h2 className="text-2xl font-bold text-green-400 mb-6">Admin Panel</h2>
      <ul className="space-y-4 text-gray-300">
        <li>
          <Link to="/admin" className="hover:text-green-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:text-green-400">
            Product Management
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="hover:text-green-400">
            Order Management
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="hover:text-green-400">
            User Management
          </Link>
        </li>
        <li>
          <Link to="/admin/reviews" className="hover:text-green-400">
            Review Management
          </Link>
        </li>
        <li>
          <Link to="/admin/distributors" className="hover:text-green-400">
            Distributor Management
          </Link>
        </li>
        <li>
          <Link to="/admin/analytics" className="hover:text-green-400">
            Analytics
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
