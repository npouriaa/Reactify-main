import { useEffect } from "react";
import useNotification from "../../Hooks/useNotification";
import { IoSearchOutline } from "react-icons/io5";
import FeedBanner from "../../components/user/home/FeedBanner";
import Post from "../../components/user/Post";

const Home = () => {
  // const { openNotificationSuccess, contextHolder } = useNotification();

  // useEffect(() => {
  //   openNotificationSuccess("Success", "Signed in succeefully", "top");
  // }, []);

  return (
    <>
      <div className="max-sm:flex md:hidden w-full h-12 px-3 py-[.2rem] bg-white items-center justify-between rounded-3xl overflow-hidden">
        <input
          placeholder="Search for friends..."
          className="w-[95%] py-2 px-2 text-sm"
          type="text"
        />
        <button>
          <IoSearchOutline color="#7932F5" size={25} />
        </button>
      </div>
      <FeedBanner />
      <div className="w-full flex-col gap-3 flex justify-center items-center">
        <Post />
        <Post />
        <Post />
      </div>
    </>
  );
};

export default Home;
