import { FaLongArrowAltLeft } from "react-icons/fa";
import { ChatContext } from "../../../context/ChatContext";
import { useContext } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { Link } from "react-router-dom";

const ChatsScreen = ({ showChatHandler }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(RequestsContext);
  console.log(data);

  return (
    <div className="max-sm:w-full md4:w-3/4 h-full flex justify-center items-center md4:py-7 md4:pr-3 max-sm:py-3 max-sm:px-3 md4:pl-0">
      <div className="bg-white dark:bg-[#111] relative transition-all w-full h-full p-4 rounded-xl">
        <div className="w-full bg-[#615DFA] flex gap-1 items-center absolute top-0 left-0 rounded-t-xl py-3 px-4">
          <button
            onClick={() => showChatHandler()}
            className="text-white mr-2 max-sm:block md4:hidden"
          >
            <FaLongArrowAltLeft size={20} />
          </button>
          <div className="flex items-center gap-2 ">
            <Link
              to={`/${currentUser?.displayName}/profile/${data?.user?.uid}`}
              className="relative flex justify-center items-center max-sm:h-12 max-sm:w-12 md4:w-14 md4:h-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
            >
              <img
                src={data?.user?.profilePhoto}
                className="object-cover h-full rounded-full"
                alt="user-profile"
              />
            </Link>
            <Link
              to={`/${currentUser?.displayName}/profile/${data?.user?.uid}`}
              className="text-white dark:hover:text-[#69C2FF]"
            >
              {data?.user?.username}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsScreen;
