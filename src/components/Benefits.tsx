import { motion } from "framer-motion";

const Benefits = () => {
  const benefits = [
    { title: "100% Organic", icon: "🌿" },
    { title: "No Side Effects", icon: "🛡️" },
    { title: "Clinically Approved", icon: "🔬" },
    { title: "Fast Results", icon: "⚡" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Why Our Products?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="bg-white p-4 rounded shadow-lg"
            >
              <p className="text-4xl">{benefit.icon}</p>
              <p className="font-semibold mt-2">{benefit.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
