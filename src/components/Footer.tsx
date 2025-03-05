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
          <form className="flex flex-col md:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md text-gray-800 flex-1 border-2 border-gray-600 focus:border-green-500"
            />
            <button className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 text-white font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* 🔹 Social Media & Payment Methods */}
      <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between container mx-auto">
        {/* Social Media Icons */}
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

        {/* Payment Methods (MPesa is now the main method) */}
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

      {/* Copyright */}
      <p className="text-gray-400 text-center mt-6 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-green-400">Cavallis</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
