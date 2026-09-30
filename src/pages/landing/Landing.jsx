import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Hero from "./Hero";
import Feature from "./Feature";
import Security from "./Security";
import Work from "./Work";
import About from "./About";

function Landing() {
  return (
    <div className="overflow-hidden ">
      <Navbar />
      <Hero />
      <Feature />
      <Security />
      <Work />
      <About />
      <Footer />
    </div>
  );
}

export default Landing;
