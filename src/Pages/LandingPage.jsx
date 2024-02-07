import Advantages from "../components/landingpage/Advantages";
import ScrollToTopButton from "../components/landingpage/ScrollToTopButton";
import Header from "../components/landingpage/Header";
import Qoute from "../components/landingpage/Qoute";
import Technologies from "../components/landingpage/Technologies";

const LandingPage = () => {
  return (
    <div className="font-semibold">
      <Header />
      <Advantages />
      <Technologies />
      <Qoute />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;
