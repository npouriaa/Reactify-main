import { FaLongArrowAltLeft } from "react-icons/fa";
import { ChatContext } from "../../../context/ChatContext";
import { useContext } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { Link } from "react-router-dom";
import Input from "./Input";

const ChatsScreen = ({ showChatHandler }) => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(RequestsContext);
  console.log(data);

  return (
    <div className="max-sm:w-full md4:w-3/4 h-full flex justify-center items-center md4:py-7 md4:pr-3 max-sm:py-3 max-sm:px-3 md4:pl-0">
      {data.chatID === null ? (
        <div className="flex bg-white dark:bg-[#111] w-full h-full justify-center items-center rounded-xl">
          <div className="w-64 h-40 rounded-2xl bg-[#f5f5f5] dark:bg-[#181818] transition-all flex justify-center items-center">
            <h3 className="text-lg dark:text-white transition-all">
              Please select a chat !
            </h3>
          </div>
        </div>
      ) : (
        <div className="relative bg-white dark:bg-[#111] transition-all w-full h-full p-4 rounded-xl">
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
                className="max-sm:h-12 max-sm:w-12 md4:w-14 md4:h-14 flex justify-center items-center overflow-hidden relative p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-image.png')] after:rotate-0 after:transition-all after:ease-in-out hover:after:rotate-[30deg]"
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
          <Input />
        </div>
      )}
    </div>
  );
};

export default ChatsScreen;
