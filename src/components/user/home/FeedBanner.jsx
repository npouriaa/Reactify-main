import bg from "../../../assets/images/user/feed.png";
import people from "../../../assets/images/user/people.png";
import { IoMdMegaphone } from "react-icons/io";

const FeedBanner = () => {
  return (
    <div className="w-full relative max-sm:h-32 md:h-52 rounded-md bg-gradient-to-l from-[#ffea00] to-[#ff9800] flex justify-center items-center">
      <img
        className="h-full object-cover w-full -z-1"
        src={bg}
        alt="feed-banner"
      />
      <div className="absolute flex justify-center items-center w-full h-full">
        <div className="w-full overflow-hidden flex gap-4 p-4">
          <div className="w-20 max-sm:hidden sm:flex items-center relative justify-center after:w-[3px] after:rounded-xl after:h-[5rem]  after:right-0 after:absolute after:bg-white">
            <IoMdMegaphone className="text-white relative min-h-[3.5rem] min-w-[3.5rem] max-w-[3.5rem] max-h-[3.5rem]" />
          </div>
          <div className="h-full text-white max-sm:text-center sm:text-start w-full flex justify-center flex-col">
            <h3 className="font-bold text-2xl">Members Newsfeed</h3>
            <p>Check what your friends have been up to!</p>
          </div>
          <img
            className=" max-sm:hidden lg:block lg:w-1/2 3xl:w-auto absolute right-0 bottom-0 object-cover"
            src={people}
            alt="feed-banner-poeple"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedBanner;
