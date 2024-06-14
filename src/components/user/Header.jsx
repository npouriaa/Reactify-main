import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo/Reactify-white.png";
import { IoPower } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { Tooltip } from "antd";
import { useContext } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../LoaderModal";
import { IoIosNotificationsOutline } from "react-icons/io";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { DarkModeContext } from "../../context/DarkModeContext";
import { IoMoonOutline } from "react-icons/io5";
import { TbSunHigh } from "react-icons/tb";

const Header = () => {
  const { currentUser, loading, setLoading } = useContext(RequestsContext);
  const { isDark, darkModeHandler } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const logOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {/* {loading && <LoaderModal />} */}
      <header className="fixed w-screen z-[900] max-sm:justify-end lg:justify-between flex items-center py-4 pl-24 max-sm:pr-4 md:pr-8 max-sm:h-[4.6rem] lg:h-20 bg-[#615DFA]">
        <Link className="max-sm:hidden lg:block" to="/">
          <img className="h-12" src={logo} alt="Reactify-logo" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="max-sm:hidden md:flex h-full px-3 py-[.2rem] items-center transition-all dark:bg-[#111] bg-white w-[18rem] rounded-3xl overflow-hidden">
            <input
              placeholder="Search for friends..."
              className="w-[90%] transition-all dark:text-white dark:placeholder:text-white dark:bg-[#111] py-2 px-2 text-sm"
              type="text"
            />
            <button>
              <IoSearchOutline color="#615DFA" size={25} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-white ">
            <Link
              to="profile"
              className="h-14 w-14 overflow-hidden relative p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-image.png')] after:rotate-0 after:transition-all after:ease-in-out hover:after:rotate-[30deg]"
            >
              <img
                className="object-cover h-full rounded-full"
                src={currentUser?.photoURL}
                alt="user"
              />
            </Link>
            <button>
              <IoIosNotificationsOutline size={25} />
            </button>
            <div className="flex w-7 h-7 overflow-hidden relative justify-center items-center">
              <button
                className={`absolute transition-all  ${
                  !isDark ? "translate-x-0" : "-translate-x-8"
                }`}
                onClick={() => darkModeHandler(true)}
              >
                <IoMoonOutline size={22} />
              </button>
              <button
                className={`absolute transition-all ${
                  isDark ? "translate-x-0" : "translate-x-8"
                }`}
                onClick={() => darkModeHandler(false)}
              >
                <TbSunHigh size={22} />
              </button>
            </div>
            <Tooltip color="#ef4444" title="Log out">
              <button
                onClick={logOutUser}
                className="h-full duration-300 hover:text-red-500"
              >
                <IoPower size={22} />
              </button>
            </Tooltip>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
