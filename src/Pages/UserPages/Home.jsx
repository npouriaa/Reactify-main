import { useEffect } from "react";
import useNotification from "../../Hooks/useNotification";
import { IoSearchOutline } from "react-icons/io5";
import FeedBanner from "../../components/user/FeedBanner";
import AddPost from "../../components/user/AddPost";
import Post from "../../components/user/Post";

const Home = () => {
  // const { openNotificationSuccess, contextHolder } = useNotification();

  // useEffect(() => {
  //   openNotificationSuccess("Success", "Signed in succeefully", "top");
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-start max-sm:px-4 max-sm:py-8">
      <div className="flex flex-col gap-5 max-sm:w-full sm2:w-5/6 md2:w-3/4 2xl:w-3/5">
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
        <AddPost />
        <div className="w-full flex-col gap-3 flex justify-center items-center">
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default Home;
