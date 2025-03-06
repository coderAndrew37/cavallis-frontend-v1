import { useEffect, useState } from "react";

const SocialProof = () => {
  const [activity, setActivity] = useState("");

  useEffect(() => {
    const actions = [
      "Alice from Nairobi just purchased Moringa Capsules! 🎉",
      "John gave 5⭐ to Baobab Superfood! 🌟",
      "Faith from Mombasa just placed an order! 🛒",
      "David just left a review: 'Best herbal product ever!' 🏆",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setActivity(actions[i]);
      i = (i + 1) % actions.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-6 bg-green-100 text-center">
      <p className="text-gray-700 font-medium">{activity}</p>
    </section>
  );
};

export default SocialProof;
