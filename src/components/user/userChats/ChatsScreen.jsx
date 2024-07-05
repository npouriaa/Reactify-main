import { FaLongArrowAltLeft } from "react-icons/fa";

const ChatsScreen = ({ showChatHandler }) => {
  return (
    <div className="max-sm:w-full md4:w-3/4 h-full flex justify-center items-center md4:py-7 md4:pr-3 max-sm:py-3 max-sm:px-3 md4:pl-0">
      <div className="bg-white dark:bg-[#111] transition-all w-full h-full p-4 rounded-xl">
        <button
          onClick={() => showChatHandler()}
          className="text-[#615DFA] max-sm:block md4:hidden"
        >
          <FaLongArrowAltLeft size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatsScreen;
