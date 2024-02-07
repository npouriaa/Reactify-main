import Advantages from "../components/landingpage/Advantages";
import Header from "../components/landingpage/Header";
import Qoute from "../components/landingpage/Qoute";
import Technologies from "../components/landingpage/Technologies";
import ScrollElement from "../components/ScrollElement";

const LandingPage = () => {
  return (
    <div className="w-full overflow-x-hidden h-full font-semibold">
      <Header />
      <Advantages />
      <Technologies />
      <Qoute/>
    </div>
  );
};

export default LandingPage;
