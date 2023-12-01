import React, { useRef } from "react";
import logo from "../Images/Reactify-white.png";
import { Link } from "react-router-dom";
import hMenuImg from "../Images/02 (1).png";
import headerImg from "../Images/01 (1).png";
import ScrollElement from "../components/ScrollElement";
import newAgeMessagingImage1 from "../Images/01 (2).png";
import newAgeMessagingImage2 from "../Images/02 (2).png";

const LandingPage = () => {
  const hMenuBtnRef = useRef();
  const hMenuRef = useRef();

  return (
    <div className="w-full overflow-x-hidden h-full font-semibold">
      <header className="bg-[url(Images/bg.png)] gap-10 max-sm:h-[700px] md:h-[900px] lg:h-[900px] xl:h-[860px] 2xl:h-[1200px] max-sm:bg-cover lg:bg-contain relative items-center bg-no-repeat flex flex-col">
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
          className="z-10 text-white overflow-hidden flex-col gap-10 fixed max-sm:flex justify-center items-center duration-500 lg:hidden w-screen transition-all no-height bg-[#7932F5]"
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
      <section className="w-full max-sm:mt-10 2xl:mt-20">
        <ScrollElement
          styles={"p-4 flex justify-center gap-10 flex-wrap items-center"}
        >
          <div className="w-[350px] justify-evenly h-[200px] flex flex-col items-start px-4">
            <div className="rounded-full p-4 flex justify-center ites-center bg-[#7048c065]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#7048C0"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl">real time</h2>
            <p className="font-thin text-gray-600">
              Dozens of leading utility providers like National Grid are gaining
              enhanced situational awareness
            </p>
          </div>
          <div className="w-[350px] justify-evenly h-[200px] flex flex-col items-start px-4">
            <div className="rounded-full p-4 flex justify-center ites-center bg-[#45d6d154]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#45D6D2"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <h2 className="text-2xl">secure</h2>
            <p className="font-thin text-gray-600">
              Dozens of leading utility providers like National Grid are gaining
              enhanced situational awareness
            </p>
          </div>
          <div className="w-[350px] justify-evenly h-[200px] flex flex-col items-start px-4">
            <div className="rounded-full p-4 flex justify-center ites-center bg-[#f7618c5b]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#F7618B"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                />
              </svg>
            </div>
            <h2 className="text-2xl">Contextual Interface</h2>
            <p className="font-thin text-gray-600">
              Dozens of leading utility providers like National Grid are gaining
              enhanced situational awareness
            </p>
          </div>
        </ScrollElement>
      </section>
      <section className="w-full mt-20 flex p-2 items-center flex-col">
        <div className="w-full flex p-2 justify-center items-center">
          <div className="max-sm:w-full flex flex-col gap-14 sm:w-3/4 lg:w-full xl:w-3/4 p-3">
            <ScrollElement
              styles={"flex justify-center items-center flex-wrap gap-10"}
            >
              <div className="max-sm:w-full p-1 lg:w-1/2 xl:w-1/3 flex flex-col gap-4 leading-7">
                <h1 className="text-4xl">New-age Messaging</h1>
                <div className="font-thin text-gray-600">
                  <p>
                    New-age Messaging refers to the next level of communication
                    technology that moves beyond traditional texting, emailing,
                    and even instant messaging. New-age Messaging is not just
                    reinventing the way we communicate but is also changing the
                    way we interact with the digital world.
                  </p>
                </div>
              </div>
              <img
                className="h-96"
                src={newAgeMessagingImage1}
                alt="new-age-messaging-img"
              />
            </ScrollElement>
            <ScrollElement
              styles={"flex mt-12 justify-center items-center flex-wrap gap-10"}
            >
              <img
                className="h-80 object-contain"
                src={newAgeMessagingImage2}
                alt="new-age-messaging-img"
              />
              <div className="max-sm:w-full p-1  lg:w-1/2 xl:w-1/3 flex flex-col gap-4 leading-7">
                <h1 className="text-4xl">Bridging Connections</h1>
                <div className="font-thin text-gray-600">
                  <p>
                    Connect with friends, family, and your professional network
                    at your fingertips. Our app brings the world closer to you.
                    Bridging Connections, as envisioned by our platform,
                    signifies a world without boundaries, a place where distance
                    is irrelevant
                  </p>
                </div>
              </div>
            </ScrollElement>
          </div>
        </div>
      </section>
      <section className="w-full p-4 mt-20 max-sm:h-[450px] sm:h-[400px] md:h-[300px] bg-cover bg-[url(Images/bg-02.png)]">
        <ScrollElement
          styles={
            "w-full h-full flex flex-wrap gap-4 justify-center items-center"
          }
        >
          <div className="w-28 h-28 rounded-full relative overflow-hidden flex justify-center items-center">
            <div className="w-full h-full absolute opacity-30 bg-gray-100"></div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              className="w-14 h-14 scale-x-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
          <div className="flex flex-col p-6 gap-4 font-extralight md:w-2/3 lg:w-1/2 xl:w-1/2 2xl:w-2/5 text-white">
            <p className="text-[18px]">
              The Internet is becoming the town square for the global village of
              tomorrow. Social media are the windows into those interactions,
              shaping our humanity one post and connect at a time.
            </p>
            <p className="font-extralight">
              Adapted from quotes by
              <span className="font-bold text-[18px]"> Bill Gates </span>
              and
              <span className="font-bold text-[18px]"> Neil Patel</span>
            </p>
          </div>
        </ScrollElement>
      </section>
    </div>
  );
};

export default LandingPage;
