import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/Reactify-white.png";

const Header = () => {
  return (
    <header className="w-screen justify-between flex py-4 px-28 h-20 bg-[#7932F5]">
      <Link to="/">
        <img className="h-full" src={logo} alt="Reactify-logo" />
      </Link>
    </header>
  );
};

export default Header;
