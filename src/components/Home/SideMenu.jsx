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
      to: "/home",
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
      text: "Profile setting",
      icon: <RiUserSettingsLine size={25} />,
      to: "/profile-setting",
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
      } absolute home-side-menu flex gap-3 flex-col items-center shadow-lg py-6 transition-all duration-500 h-screen bg-white`}
    >
      <div className="w-full flex gap-11 justify-between px-4 ">
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
      <ul className="w-full px-4 gap-6 flex flex-col h-10 py-8 text-[#909090] ">
        {items.map((item, index) => (
          <Tooltip
            trigger={openSideMenu ? "" : "hover"}
            color="#F5658C"
            placement="rightBottom"
            title={item.text}
          >
            <Link key={index} to={item.to}>
              <li
                className={`${
                  initialSideMenuOpen
                    ? openSideMenu
                      ? "justify-start"
                      : "animate-justifyEnd"
                    : "justify-end"
                } flex items-center gap-2 transition-all duration-300 hover:text-[#F5658C] px-[.6rem]`}
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
