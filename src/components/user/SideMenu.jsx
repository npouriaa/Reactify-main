import React, { useContext, useEffect, useRef, useState } from "react";
import "../../assets/styles/sideMenu.css";
import logoBlack from "../../assets/images/logo/Reactify-black.png";
import logoWhite from "../../assets/images/logo/Reactify-white.png";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { PiUsersBold } from "react-icons/pi";
import { Tooltip } from "antd";
import { DarkModeContext } from "../../context/DarkModeContext";
import { RequestsContext } from "../../context/RequestsContext";

const SideMenu = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [initialSideMenuOpen, setInitialSideMenuOpen] = useState(false);
  const { isDark } = useContext(DarkModeContext);
  const { currentUser } = useContext(RequestsContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const hMenuRef = useRef();
  const sideMenuRef = useRef();

  const sideMenuHandler = () => {
    hMenuRef.current.classList.toggle("active");
    setInitialSideMenuOpen(true);
    setOpenSideMenu(!openSideMenu);
  };

  const items = [
    {
      text: "Home",
      icon: <TiHome size={25} />,
      to: "",
      active: activeIndex === 0 ? true : false,
    },
    {
      text: "My posts",
      active: activeIndex === 1 ? true : false,
      to: "/my-posts",
      active: false,
    },
    {
      text: "Chats",
      icon: <PiChatsCircleDuotone size={25} />,
      to: "/chats",
      active: activeIndex === 2 ? true : false,
    },
    {
      text: "Friends",
      icon: <PiUsersBold size={25} />,
      to: "/friends",
      active: activeIndex === 3 ? true : false,
    },
    {
      text: "Profile",
      icon: <RiUserSettingsLine size={25} />,
      to: `profile/${currentUser.uid}`,
      active: activeIndex === 4 ? true : false,
    },
  ];

  return (
    <div
      ref={sideMenuRef}
      className={`${
        initialSideMenuOpen
          ? openSideMenu
            ? "animate-slideIn"
            : "animate-slideOut"
          : "left-[-11rem]"
      } fixed z-[1000] flex flex-col items-center transition-all duration-500`}
    >
      <div className="w-full max-sm:h-[4.6rem] lg:h-20 bg-white transition-all dark:bg-[#111] flex items-center gap-11 justify-between px-4 ">
        <Link to="/">
          <img
            className="h-11 min-w-[133.4px]"
            src={isDark ? logoWhite : logoBlack}
            alt="logo"
          />
        </Link>
        <button
          className="flex items-center justify-center overflow-hidden w-11 h-11"
          onClick={() => sideMenuHandler()}
        >
          <svg
            ref={hMenuRef}
            className="absolute w-16 ham ham6"
            viewBox="0 0 100 100"
          >
            <path
              className="line fill-none stroke-[#615DFA] stroke-[5.5] top"
              d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
            />
            <path
              className="line fill-none stroke-[#615DFA] stroke-[5.5] middle"
              d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
            />
            <path
              className="line fill-none stroke-[#615DFA] stroke-[5.5] bottom"
              d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
            />
          </svg>
        </button>
      </div>
      <ul
        className={`${
          initialSideMenuOpen
            ? openSideMenu
              ? "max-sm:animate-showText xl:animate-none"
              : "max-sm:animate-hideText xl:animate-none"
            : "max-sm:hidden xl:flex"
        } shadow-lg bg-white transition-all dark:bg-[#111] h-screen flex w-full gap-6 flex-col py-8 text-[#909090] dark:text-white`}
      >
        {items.map((item, index) => (
          <Tooltip
            key={index}
            trigger={openSideMenu ? "" : "hover"}
            color={isDark ? "#615DFA" : "#F5658C"}
            placement="rightBottom"
            title={item.text}
          >
            <Link
              className="hover:text-[#F5658C] dark:hover:text-[#615DFA]"
              to={item.to}
            >
              <li
                onClick={() => setActiveIndex(index)}
                className={`${
                  initialSideMenuOpen
                    ? openSideMenu
                      ? "justify-start"
                      : "animate-justifyEnd"
                    : "justify-end"
                } flex items-center gap-2 pr-7 transition-all pl-[1rem] ${item.active && "text-[#F5658C] dark:text-[#615DFA]"}`}
              >
                <div >
                  {item.icon}
                </div>
                <span
                  className={`${
                    initialSideMenuOpen
                      ? openSideMenu
                        ? "animate-showText"
                        : "animate-hideText"
                      : "hidden"
                  }`}
                >
                  {item.text}
                </span>
              </li>
            </Link>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
