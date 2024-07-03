import { Link } from "react-router-dom";
import ScrollElement from "./ScrollElement";
import { FaGithub } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const Footer = ({ darkStyles }) => {
  const { isDark } = useContext(DarkModeContext);
  return (
    <div className="w-full">
      <ScrollElement>
        <footer
          className={`w-full flex gap-2 py-4 flex-col items-center bg-white ${
            darkStyles && "dark:bg-[#111]"
          } transition-all`}
        >
          <div className="h-full flex  gap-4">
            <div
              className={`flex gap-2 items-center text-[#585858]  ${
                darkStyles && "dark:text-white"
              } `}
            >
              <Link
                className="hover:text-[#69b1ff] transition-all"
                target="_blank"
                to="https://www.linkedin.com/in/npouriaa/"
              >
                <FaLinkedin size={21} />
              </Link>
              <Link
                className="hover:text-[#69b1ff] transition-all"
                target="_blank"
                to="https://github.com/npouriaa"
              >
                <FaGithub size={21} />
              </Link>
              <Link
                className="hover:text-[#69b1ff] transition-all"
                target="_blank"
                to="https://t.me/npouriaa"
              >
                <FaTelegram size={21} />
              </Link>
            </div>
          </div>
          <div
            className={`w-full flex  ${
              darkStyles && "dark:text-white"
            } items-center justify-center`}
          >
            <p className="text-xs">
              All copyrights deserved for{" "}
              <Link
                className="hover:text-[#69b1ff] transition-all"
                target="_blank"
                to="https://www.linkedin.com/in/npouriaa/"
              >
                Npouriaa
              </Link>{" "}
              ©
            </p>
          </div>
        </footer>
      </ScrollElement>
    </div>
  );
};

export default Footer;
