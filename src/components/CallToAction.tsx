import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-blue-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">
        Join the Cavallis Wellness Movement
      </h2>
      <p className="text-lg mb-6">
        Start your journey to better health with **100% natural herbal
        remedies**.
      </p>
      <Link
        to="/shop"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
      >
        Shop Now
      </Link>
    </section>
  );
};

export default CallToAction;
