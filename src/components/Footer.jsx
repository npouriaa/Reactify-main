import { Link } from "react-router-dom";
import logoBlack from "../assets/images/logo/Reactify-black.png";
import logoWhite from "../assets/images/logo/Reactify-white.png";
import ScrollElement from "./ScrollElement";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Footer = () => {
  const { isDark } = useContext(DarkModeContext);
  return (
    <ScrollElement>
      <footer className="w-full flex gap-4 pb-2 pt-8 flex-col items-center bg-white dark:bg-[#111] transition-all">
        <div className="w-full h-full max-sm:gap-6 px-8 sm:gap-8 md:gap-14 xl:gap-28 flex max-sm:justify-start lg:justify-center flex-wrap items-start">
          <div className="h-full flex flex-col gap-4">
            <Link to="/">
              <img
                className="w-[133.39px] max-sm:h-10 lg:h-12 md:h-10"
                src={isDark ? logoWhite : logoBlack}
                alt="logo"
              />
            </Link>
            <p className="font-thin dark:text-white transition-all">Follow me on :</p>
            <div className="flex gap-2 items-center text-[#585858] dark:text-white">
              <Link target="_blank" to="https://www.linkedin.com/in/npouriaa/">
                <FaLinkedin size={21} />
              </Link>
              <Link target="_blank" to="https://github.com/npouriaa">
                <FaGithub size={21} />
              </Link>
              <Link target="_blank" to="https://t.me/npouriaa">
                <FaTelegram size={21} />
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center max-sm:gap-10 sm:gap-16 text-black dark:text-white">
            <div className="flex flex-col gap-5">
              <h4 className="text-[#615DFA] text-lg">Company</h4>
              <ul className="text-sm flex flex-col gap-3">
                <Link>
                  <li>About us</li>
                </Link>
                <Link>
                  <li>Features</li>
                </Link>
                <Link>
                  <li>Pricing</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-[#615DFA] text-lg">Resources</h4>
              <ul className="text-sm flex flex-col gap-3">
                <Link>
                  <li>FAQs</li>
                </Link>
                <Link>
                  <li>Testimonial</li>
                </Link>
                <Link>
                  <li>Terms & Condition</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-[#615DFA] text-lg">Products</h4>
              <ul className="flex text-sm flex-col gap-3">
                <Link>
                  <li>Blog</li>
                </Link>
                <Link>
                  <li>Help center</li>
                </Link>
                <Link>
                  <li>Contact</li>
                </Link>
              </ul>
            </div>
            <div className="flex flex-col gap-5">
              <h4 className="text-[#615DFA] text-lg">Relevent</h4>
              <ul className="flex text-sm flex-col gap-3">
                <Link>
                  <li>Why</li>
                </Link>
                <Link>
                  <li>Products</li>
                </Link>
                <Link>
                  <li>Customers</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex dark:text-white items-center py-4 justify-center border-t-2 dark:border-[#585858] transition-all border-t-gray-200">
          <p>
            Made by{" "}
            <Link className="text-[#615DFA]" to="https://github.com/npouriaa">
              Npouriaa
            </Link>
          </p>
        </div>
      </footer>
    </ScrollElement>
  );
};

export default Footer;
