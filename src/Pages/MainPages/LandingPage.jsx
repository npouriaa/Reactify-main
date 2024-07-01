import Advantages from "../../components/landingpage/Advantages";
import ScrollToTopButton from "../../components/landingpage/ScrollToTopButton";
import Header from "../../components/landingpage/Header";
import Qoute from "../../components/landingpage/Qoute";
import Technologies from "../../components/landingpage/Technologies";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Advantages />
      <Technologies />
      <Qoute />
      <Footer darkStyles={false}/>
      <ScrollToTopButton />
    </>
  );
};

export default LandingPage;
