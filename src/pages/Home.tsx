import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Achievements from "../components/Achievements";
import Benefits from "../components/Benefits";
import SocialProof from "../components/SocialProof";
import FAQs from "../components/Faqs";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Achievements />
      <Benefits />
      <Testimonials />
      <SocialProof />
      <CallToAction />
      <FAQs />
    </>
  );
};

export default Home;
