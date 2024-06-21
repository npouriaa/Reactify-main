import { IoSearchOutline } from "react-icons/io5";
import FeedBanner from "../../components/user/home/FeedBanner";
import Posts from "../../components/user/Posts/Posts";
import banner from "../../assets/images/user/banner.png";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { RequestsContext } from "../../context/RequestsContext";

const Home = () => {
  const [showAllPosts, setShowAllPosts] = useState(false);
  const { currentUser } = useContext(RequestsContext);
  const location = useLocation();

  useEffect(() => {
    if (currentUser?.displayName === location.pathname.split("/")[1]) {
      // setShowAllPosts(true);
      // console.log('first')
    }
  }, []);

  return (
    <>
      <div className="max-sm:flex md:hidden w-full h-12 px-3 py-[.2rem] bg-white items-center justify-between rounded-3xl overflow-hidden">
        <input
          placeholder="Search for friends..."
          className="w-[95%] py-2 px-2 text-sm"
          type="text"
        />
        <button>
          <IoSearchOutline color="#615DFA" size={25} />
        </button>
      </div>
      <FeedBanner />
      <div className="w-full flex relative gap-4">
        <div className="max-sm:w-full min-h-full lg:w-3/5 xl:w-2/3 flex-col gap-3 flex justify-center items-center">
          <Posts showAllPosts={true} />
        </div>
        <div className="max-sm:hidden lg:flex lg:w-2/5 sticky top-24 xl:w-1/3 h-80 bg-[#ffca28] rounded-md flex-col items-center justify-between py-4">
          <div className="text-white text-2xl text-center">
            <h2 className="uppercase">The most popular</h2>
            <h2>Reactify</h2>
          </div>
          <img className="h-52 object-cover" src={banner} alt="banner" />
        </div>
      </div>
    </>
  );
};

export default Home;
