const Achievements = () => {
  const stats = [
    { number: "50,000+", text: "Happy Customers" },
    { number: "20+", text: "Certified Herbal Products" },
    { number: "98%", text: "Customer Satisfaction Rate" },
    { number: "10+ Years", text: "Experience in Wellness" },
  ];

  return (
    <section className="py-12 bg-green-600 text-white text-center">
      <h2 className="text-3xl font-bold">Why Choose Cavallis?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div key={index}>
            <p className="text-4xl font-extrabold">{stat.number}</p>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
