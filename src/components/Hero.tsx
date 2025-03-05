import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url('/hero-bg.jpeg')` }}
    >
      {/* 🔥 Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90"></div>

      {/* 🔥 Animated Hero Content */}
      <motion.div
        className="relative z-10 text-white px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold tracking-wide leading-tight mb-4 text-shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Elevate Your Wellness
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl max-w-3xl mx-auto opacity-90 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          Experience premium organic & herbal supplements designed to transform
          your health, naturally.
        </motion.p>

        {/* 🔥 Call to Action Buttons */}
        <motion.div
          className="mt-6 flex flex-col md:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        >
          <Link
            to="/products"
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-lg transition duration-300 shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transform hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 border border-white hover:bg-white hover:text-black text-white font-bold text-lg rounded-lg transition duration-300 shadow-lg shadow-white/50 hover:shadow-white/80 transform hover:scale-105"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
