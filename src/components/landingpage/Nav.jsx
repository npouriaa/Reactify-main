import logo from "../../assets/images/logo/Reactify-white.png";
import hMenuImg from "../../assets/images/landingpage/header/nav/02 (1).png";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const Nav = () => {
  const hMenuBtnRef = useRef();
  const hMenuRef = useRef();
  const [disableScroll, setDisableScroll] = useState(false);

  const disableScrollHandler = () => {
    if (disableScroll) {
      setDisableScroll(false);
      document.body.style.overflow = "visible";
    } else {
      setDisableScroll(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <nav className="max-sm:w-full xl:w-4/5 2xl:w-2/3 p-5 h-28 flex items-center max-sm:justify-between lg:justify-around">
        <Link to="/">
          <img className="max-sm:h-10 sm:h-12 md:h-14" src={logo} alt="logo" />
        </Link>
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
          <Link
            className="max-sm:w-20 max-sm:text-xs max-sm:h-10 sm:text-sm sm:w-24 lg:w-28 lg:h-12 rounded-lg bg-white hover:bg-[#615DFA] hover:text-white transition-all duration-500 flex justify-center items-center"
            to="login"
          >
            Login
          </Link>
          <Link
            className="max-sm:w-20 max-sm:text-xs max-sm:h-10 sm:text-sm sm:w-24 lg:w-28 lg:h-12 rounded-lg bg-[#615DFA] text-white hover:bg-[#F5658C] transition-all duration-500 flex justify-center items-center"
            to="/sign-up"
          >
            Sign up
          </Link>
          <button
            ref={hMenuBtnRef}
            onClick={() => {
              hMenuBtnRef.current.classList.toggle("active");
              hMenuRef.current.classList.toggle("h-screen");
              disableScrollHandler();
            }}
            className="max-sm:block rounded-full lg:hidden plate plate5  h-10 w-10 bg-white z-20 relative"
          >
            <svg
              className="burger absolute top-0"
              version="1.1"
              viewBox="0 0 100 100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#615DFA] line1"
                d="M 30,35 H 70 "
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#615DFA] line2"
                d="M 50,50 H 30 L 34,32"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#615DFA] line3"
                d="M 50,50 H 70 L 66,68"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="line origin-[50%] fill-none stroke-line stroke-[6px] stroke-[#615DFA] line4"
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
                className="line stroke-[8.5px] origin-[50%] fill-none stroke-line stroke-[#615DFA]"
                d="M 34,32 L 66,68"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                className="line stroke-[8.5px] origin-[50%] fill-none stroke-line stroke-[#615DFA]"
                d="M 66,32 L 34,68"
              />
            </svg>
          </button>
        </div>
        <div
          ref={hMenuRef}
          className="z-10 text-white overflow-hidden flex-col gap-10 fixed max-sm:flex justify-center items-center duration-500 lg:hidden w-screen top-0 left-0 transition-all no-height bg-[#615DFA]"
        >
          <div className="">
            <h1 className="text-3xl text-center">We're here to help you</h1>
            <h1 className="text-3xl text-center">find new friends</h1>
          </div>
          <ul className="flex flex-col max-sm:gap-10 sm:gap-4">
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
        </div>
      </nav>
    </>
  );
};

export default Nav;
