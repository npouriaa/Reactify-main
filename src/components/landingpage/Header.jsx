import headerImg from "../../assets/images/landingpage/header/01 (1).png";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-[url(assets/images/landingpage/header/bg.png)] gap-10 max-sm:h-[600px] md:h-[900px] lg:h-[900px] xl:h-[860px] 2xl:h-[1000px] 3xl:h-[1200px] max-sm:bg-cover lg:bg-contain relative items-center bg-no-repeat flex flex-col  overflow-hidden">
      <Nav />
      <div className=" max-sm:w-full p-4 lg:w-5/6 xl:w-3/4 2xl:w-full 2xl:justify-center relative h-[550px] flex md:flex-col 2xl:flex-row items-center gap-10">
        <div className="md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[500px] flex flex-col gap-6 text-white h-[361px] p-2">
          <h1 className="leading-snug max-sm:text-[30px] md:text-[35px] lg:text-[42px]">
            Unlock a World of Connections: A Smarter Way To Form Lifelong
            Friendships
          </h1>
          <p className="text-xl font-thin">
            Transform Your Social Experience: Connect, Engage, and Cultivate
            Authentic Friendships.
          </p>
        </div>
        <img
          className="md:h-[300px] xl:h-[400px] 3xl:h-[450px] max-sm:hidden md:block"
          src={headerImg}
          alt="header-image"
        />
      </div>
    </header>
  );
};

export default Header;
