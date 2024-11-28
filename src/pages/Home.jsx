import Hero from "../components/features/Home/Hero";
import Trending from "../components/features/Home/Trending";
import Partners from "../components/layouts/Partners";

const Home = () => {
  return (
    <>
      <div>
        <Hero />
        <Trending />
        <Partners />
      </div>
    </>
  );
};

export default Home;
