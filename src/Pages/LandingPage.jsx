import React, { useRef } from "react";
import logo from "../Images/Reactify-white.png";
import { Link } from "react-router-dom";
import hMenuImg from "../Images/02 (1).png";
import headerImg from "../Images/01 (1).png";

const LandingPage = () => {
  const hMenuBtnRef = useRef();
  const hMenuRef = useRef();
  return (
    <div className="w-full overflow-x-hidden h-full font-semibold">
      <header className="gap-10 max-sm:h-[700px] md:h-[750px] lg:h-[1150px] max-sm:bg-cover lg:bg-contain relative items-center bg-no-repeat flex flex-col">
        <nav className="max-sm:w-full xl:w-4/5 2xl:w-2/3 p-3 h-28 flex items-center max-sm:justify-between lg:justify-around">
          <img className="max-sm:h-10 sm:h-12 md:h-14" src={logo} alt="logo" />
          <ul className="gap-10 lg:flex max-sm:hidden">
            <Link to="">
              <li className="text-white hover:text-[#162167] transition-all duration-500">
                About us
              </li>
            </Link>
            <Link to="">
              <li className="text-white hover:text-[#162167] transition-all duration-500">
                FAQ
              </li>
            </Link>
            <Link to="">
              <li className="text-white hover:text-[#162167] transition-all duration-500">
                Why us?
              </li>
            </Link>
            <Link to="">
              <li className="text-white hover:text-[#162167] transition-all duration-500">
                Contact
              </li>
            </Link>
          </ul>
          <div className="flex max-sm:gap-2 sm:gap-5 text-[#162167]">
            <Link to="login">
              <button className="max-sm:w-20 max-sm:text-xs max-sm:h-10 sm:text-sm sm:w-24 lg:w-28 lg:h-12 rounded-lg bg-white hover:bg-[#7932F5] hover:text-white transition-all duration-500">
                Login
              </button>
            </Link>
            <Link to="signup">
              <button className="max-sm:w-20 max-sm:text-xs max-sm:h-10 sm:text-sm sm:w-24 lg:w-28 lg:h-12 rounded-lg bg-[#7932F5] text-white hover:bg-[#FB3C7F] transition-all duration-500">
                Sign up
              </button>
            </Link>
            <button
              ref={hMenuBtnRef}
              onClick={() => {
                hMenuBtnRef.current.classList.toggle("active");
                hMenuRef.current.classList.toggle("h-screen");
              }}
              className="max-sm:block rounded-full lg:hidden plate plate5 relative h-10 w-10 bg-white z-20"
            >
              <svg
                className="burger absolute top-0"
                version="1.1"
                viewBox="0 0 100 100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#7932F5] line1"
                  d="M 30,35 H 70 "
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#7932F5] line2"
                  d="M 50,50 H 30 L 34,32"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#7932F5] line3"
                  d="M 50,50 H 70 L 66,68"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#7932F5] line4"
                  d="M 30,65 H 70 "
                />
              </svg>
              <svg
                className="x absolute top-0"
                version="1.1"
                viewBox="0 0 100 100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line stroke-[8.5px] origin-[50%] fill-none stroke-line stroke-[#7932F5]"
                  d="M 34,32 L 66,68"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="line stroke-[8.5px] origin-[50%] fill-none stroke-line stroke-[#7932F5]"
                  d="M 66,32 L 34,68"
                />
              </svg>
            </button>
          </div>
        </nav>
        <nav
          ref={hMenuRef}
          className="z-10 text-white overflow-hidden flex-col gap-10 absolute max-sm:flex justify-center items-center duration-500 lg:hidden w-screen transition-all no-height bg-[#7932F5]"
        >
          <div className="">
            <h1 className="text-3xl text-center">We're here to help you</h1>
            <h1 className="text-3xl text-center">find new friends</h1>
          </div>
          <ul className="flex flex-col gap-10 ">
            <Link>
              <li>- About us</li>
            </Link>
            <Link>
              <li>- FAQ</li>
            </Link>
            <Link>
              <li>- why us?</li>
            </Link>
            <Link>
              <li>- contact</li>
            </Link>
          </ul>
          <img
            className="max-sm:h-[200px] sm:h-[350px]"
            src={hMenuImg}
            alt="img"
          />
        </nav>
        <div className=" max-sm:w-full p-4 lg:w-5/6 xl:w-3/4 2xl:w-full 2xl:justify-center relative h-[550px] flex items-center gap-4">
          <div className="w-[500px] flex flex-col gap-6 text-white h-[361px] ">
            <h1 className="leading-snug max-sm:text-[30px] md:text-[35px] lg:text-[42px]">
              Unlock a World of Connections:
              A Smarter Way To Form Lifelong
              Friendships
            </h1>
            <p className="text-xl font-thin">
              Transform Your Social Experience: Connect, Engage, and Cultivate
              Authentic Friendships.
            </p>
          </div>
          <img className="xl:h-[400px] 2xl:h-[400px] max-sm:hidden 2xl:block" src={headerImg} alt="header-image" />
        </div>
      </header>
    </div>
  );
};

export default LandingPage;
