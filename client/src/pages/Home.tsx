import Banner from "../components/Banner";
import FeatureSection from "../components/FeatureSection";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import Testimonail from "../components/Testimonail";

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureSection/>
      <Banner/>
      <Testimonail/>
      <NewsLetter/>
      
    </>
  );
};

export default Home;
