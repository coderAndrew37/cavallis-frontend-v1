const About = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <img
          src="/about-us.jpg"
          alt="About Cavallis"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:w-1/2 md:pl-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            About Cavallis
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cavallis is a Kenyan-based herbal medicine brand committed to
            **natural healing** and **holistic wellness**. We source the finest
            herbs from trusted local farmers to bring you **pure, effective, and
            affordable** remedies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
