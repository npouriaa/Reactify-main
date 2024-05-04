import { useEffect } from "react";
import useNotification from "../../Hooks/useNotification";
import { IoSearchOutline } from "react-icons/io5";

const Home = () => {
  // const { openNotificationSuccess, contextHolder } = useNotification();

  // useEffect(() => {
  //   openNotificationSuccess("Success", "Signed in succeefully", "top");
  // }, []);

  return (
    <div className="w-full h-full flex justify-center items-start p-8">
      <div className="max-sm:flex md:hidden h-12 px-3 py-[.2rem] bg-white items-center justify-between max-sm:w-full md2:w-5/6 rounded-3xl overflow-hidden">
        <input
          placeholder="Search for friends..."
          className="w-[95%] py-2 px-2 text-sm"
          type="text"
        />
        <button className="">
          <IoSearchOutline color="#7932F5" size={25} />
        </button>
      </div>
    </div>
  );
};

export default Home;
