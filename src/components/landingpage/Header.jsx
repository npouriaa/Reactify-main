import headerImg from "../../Images/01 (1).png";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="bg-[url(Images/bg.png)] gap-10 max-sm:h-[700px] md:h-[900px] lg:h-[900px] xl:h-[860px] 2xl:h-[1000px] max-sm:bg-cover lg:bg-contain relative items-center bg-no-repeat flex flex-col">
      <Nav />
      <div className=" max-sm:w-full p-4 lg:w-5/6 xl:w-3/4 2xl:w-full 2xl:justify-center relative h-[550px] flex items-center gap-4">
        <div className="w-[500px] flex flex-col gap-6 text-white h-[361px] ">
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
          className="xl:h-[400px] 2xl:h-[420px] max-sm:hidden 2xl:block"
          src={headerImg}
          alt="header-image"
        />
      </div>
    </header>
  );
};

export default Header;
