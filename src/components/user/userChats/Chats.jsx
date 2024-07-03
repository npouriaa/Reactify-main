import { useContext, useEffect, useState } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { ChatContext } from "../../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(RequestsContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="max-sm:w-full md2:w-1/4 h-full max-sm:py-3 max-sm:px-3 md2:pl-3 md2:py-7">
      <div className="bg-white dark:bg-[#111] transition-all w-full h-full p-2 rounded-xl">
        <ul className="w-full py-2 gap-3 flex flex-col">
          {chats &&
            Object.entries(chats)
              ?.sort((a, b) => b[1].date - a[1].date)
              .map((chat) => (
                <li
                  key={chat[0]}
                  className="cursor-pointer w-full bg-[#f5f5f5] dark:bg-[#181818] transition-all h-14 gap-2 flex items-center px-2 rounded-2xl"
                >
                  <img
                    className="rounded-full border-[#6b7280] h-10 w-10 object-cover border-[1px]"
                    src={chat[1].userInfo.profilePhoto}
                    alt=""
                  />
                  <div className="h-full py-2 w-3/4 justify-around flex flex-col ">
                    <p className="text-start text-xs font-bold truncate dark:text-white transition-all">
                      {chat[1].userInfo.username}
                    </p>
                    <p className="text-start text-xs text-gray-500 truncate">
                      {chat[1].lastMessage?.text ? chat[1].lastMessage?.text : "No recent message"}
                    </p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Chats;
