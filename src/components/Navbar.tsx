import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ Icons
import { useAuth } from "../hooks/useAuth";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Auth State

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-green-700 text-3xl font-bold tracking-wide"
        >
          Cavallis 🌿
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li>
            <Link to="/products" className="hover:text-green-600 transition">
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-600 transition">
              Contact
            </Link>
          </li>

          {/* 🔹 Cart Icon */}
          <li>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-green-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                2
              </span>
            </Link>
          </li>

          {/* 🔹 Auth Section */}
          {user ? (
            <>
              <li className="text-green-700 font-bold">Hi, {user.name}!</li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-green-600 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="hover:text-green-600 transition"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-green-700 text-2xl"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* ✅ Mobile Menu (Dropdown) - Fixed Structure */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-6 text-3xl text-green-700"
            >
              <FiX />
            </button>

            <ul className="flex flex-col items-center space-y-6 text-gray-800 text-xl font-medium">
              <li>
                <Link to="/products" onClick={() => setIsOpen(false)}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>

              {/* ✅ Mobile Cart Link */}
              <li>
                <Link
                  to="/cart"
                  className="flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FaShoppingCart className="text-2xl text-gray-700 hover:text-green-600" />
                  <span className="text-gray-700">Cart (2)</span>
                </Link>
              </li>

              {/* ✅ Auth Section in Mobile */}
              {user ? (
                <>
                  <li className="text-green-700 font-bold">Hi, {user.name}!</li>
                  <li>
                    <button
                      onClick={logout}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
