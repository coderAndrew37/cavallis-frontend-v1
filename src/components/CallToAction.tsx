import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Smooth animations
import ctaImage from "../assets/client-with-product.jpeg"; // ✅ Update image path

const CallToAction = () => {
  return (
    <section className="relative py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        {/* 🔹 Image of a Happy Client */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={ctaImage}
            alt="Happy Customer with Cavallis Product"
            className="rounded-lg shadow-lg w-full max-w-sm mx-auto md:mx-0"
          />
        </motion.div>

        {/* 🔹 Text Section */}
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Transform Your Health <br /> with **100% Natural Remedies** 🌿
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Join **thousands** who have elevated their wellness with Cavallis.
            Our organic, scientifically-backed herbal products are changing
            lives. Ready to experience the difference?
          </p>

          {/* 🔹 CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/products"
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg transition shadow-lg"
            >
              Shop Now 🛍️
            </Link>
            <Link
              to="/testimonials"
              className="border border-white hover:bg-white hover:text-green-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-lg"
            >
              See Testimonials 💬
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
