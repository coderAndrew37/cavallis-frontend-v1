import { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaMobileAlt,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Newsletter Subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return setMessage("Please enter a valid email address");

    try {
      setLoading(true);
      setMessage(null);

      // ✅ Fix API URL
      const response = await axios.post(
        "http://localhost:4000/api/newsletter", // Change to production URL when deployed
        { email }
      );

      setMessage(response.data.message);
      setEmail(""); // ✅ Clear input on success
    } catch (error: unknown) {
      // ✅ Fix: Use `AxiosError` for better TypeScript handling
      const axiosError = error as AxiosError<{ message?: string }>;
      setMessage(
        axiosError.response?.data?.message || "Failed to subscribe, try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-950 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* 🔹 Company Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Cavallis 🌿</h3>
          <p>
            Your trusted source for high-quality herbal products. Elevate your
            health naturally.
          </p>
        </div>

        {/* 🔹 Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/products" className="hover:text-green-400">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-green-400">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-green-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-green-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* 🔹 Newsletter Subscription */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Subscribe to Our Newsletter
          </h3>
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md flex-1 border-2 border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 text-white font-semibold disabled:bg-gray-500"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="text-sm mt-2 text-gray-300">{message}</p>}
        </div>
      </div>

      {/* 🔹 Social Media & Payment Methods */}
      <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between container mx-auto">
        {/* 🔹 Social Media Icons */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-green-400"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-green-400"
          >
            <FaTwitter size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-green-400"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-green-400"
          >
            <FaLinkedin size={22} />
          </a>
        </div>

        {/* 🔹 Payment Methods */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <div className="flex flex-col items-center">
            <FaMobileAlt size={45} className="text-green-500" />
            <span className="text-sm font-semibold text-green-400">MPesa</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCcVisa size={35} className="text-gray-400" />
            <span className="text-xs">Visa</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCcMastercard size={35} className="text-gray-400" />
            <span className="text-xs">MasterCard</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCcPaypal size={35} className="text-gray-400" />
            <span className="text-xs">PayPal</span>
          </div>
        </div>
      </div>

      {/* 🔹 Copyright */}
      <p className="text-gray-400 text-center mt-6 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-green-400">Cavallis</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
