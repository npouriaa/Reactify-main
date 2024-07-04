import { FaLongArrowAltLeft } from "react-icons/fa";

const ChatsScreen = () => {
  return (
    <div className="max-sm:w-full md2:w-3/4 h-full flex justify-center items-center md2:py-7 md2:pr-3 max-sm:py-3 max-sm:px-3 md2:pl-0">
      <div className="bg-white dark:bg-[#111] transition-all w-full h-full p-4 rounded-xl">
      <button onClick={() => showChatHandler()} className="text-white ">
          <FaLongArrowAltLeft size={20} />
        </button>
        <div>Chats</div>
      </div>
    </div>
  );
};

export default ChatsScreen;
