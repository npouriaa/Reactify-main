import React, { useRef, useState } from "react";
import "../../assets/styles/sideMenu.css";
import logo from "../../assets/images/logo/Reactify-black.png";
import { Link } from "react-router-dom";
import { BiNews } from "react-icons/bi";
import { PiChatsCircleDuotone } from "react-icons/pi";
import { RiUserSettingsLine } from "react-icons/ri";
import { LuClipboardList } from "react-icons/lu";
import { PiUsersBold } from "react-icons/pi";
import { Tooltip } from "antd";

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

  const items = [
    {
      text: "Feed",
      icon: <BiNews size={25} />,
      to: "",
    },
    {
      text: "My posts",
      icon: <LuClipboardList size={25} />,
      to: "/my-posts",
    },
    {
      text: "Chats",
      icon: <PiChatsCircleDuotone size={25} />,
      to: "/chats",
    },
    {
      text: "Friends",
      icon: <PiUsersBold size={25} />,
      to: "/friends",
    },
    {
      text: "Profile",
      icon: <RiUserSettingsLine size={25} />,
      to: "profile",
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
      <div className="w-full max-sm:h-[4.6rem] lg:h-20 bg-white flex items-center gap-11 justify-between px-4 ">
        <Link to="/">
          <img className="h-11" src={logo} alt="logo" />
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
      <ul
        className={`${
          initialSideMenuOpen
            ? openSideMenu
              ? "max-sm:animate-showText xl:animate-none"
              : "max-sm:animate-hideText xl:animate-none"
            : "max-sm:hidden xl:flex"
        } shadow-lg bg-white h-screen flex w-full gap-6 flex-col py-8 text-[#909090]`}
      >
        {items.map((item, index) => (
          <Tooltip
            key={index}
            trigger={openSideMenu ? "" : "hover"}
            color="#F5658C"
            placement="rightBottom"
            title={item.text}
          >
            <Link to={item.to}>
              <li
                className={`${
                  initialSideMenuOpen
                    ? openSideMenu
                      ? "justify-start"
                      : "animate-justifyEnd"
                    : "justify-end"
                } flex items-center  gap-2 transition-all duration-300 hover:text-[#F5658C] pr-7 pl-[1rem]`}
              >
                {item.icon}
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
