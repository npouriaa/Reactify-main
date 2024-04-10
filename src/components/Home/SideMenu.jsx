import React, { useRef, useState } from "react";
import "../../assets/styles/sideMenu.css";
import logo from "../../assets/images/logo/Reactify-black.png";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [initialSideMenuOpen, setInitialSideMenuOpen] = useState(false);
  const hMenuRef = useRef();
  const sideMenuRef = useRef();

  const sideMenuHandler = () => {
    hMenuRef.current.classList.toggle("active");
    setInitialSideMenuOpen(true);
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <div
      ref={sideMenuRef}
      className={`${
        initialSideMenuOpen ? (openSideMenu ? "animate-slideIn" : "animate-slideOut") : "left-[-11rem]"
      } absolute home-side-menu flex flex-col items-center shadow-lg px-4 py-6 transition-all duration-500 h-screen bg-white`}
    >
      <div className="w-full flex gap-11 justify-between">
        <Link to="/">
          <img className="h-11" src={logo} alt="logo" />
        </Link>
        <button
          className="w-11 h-11 flex justify-center items-center overflow-hidden"
          onClick={() => sideMenuHandler()}
        >
          <svg
            ref={hMenuRef}
            className="ham absolute ham6 w-16"
            viewBox="0 0 100 100"
          >
            <path
              className="line fill-none stroke-[#7932F5] stroke-[5.5] top"
              d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
            />
            <path
              className="line fill-none stroke-[#7932F5] stroke-[5.5] middle"
              d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
            />
            <path
              className="line fill-none stroke-[#7932F5] stroke-[5.5] bottom"
              d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
