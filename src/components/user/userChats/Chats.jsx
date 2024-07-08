import { useContext, useEffect, useState } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { ChatContext } from "../../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import RequestsLoader from "../RequestsLoader";

const Chats = ({ showChatHandler }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(RequestsContext);
  const { dispatch } = useContext(ChatContext);

  const handleSelect = (user) => {
    showChatHandler && showChatHandler();
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  useEffect(() => {
    const getChats = () => {
      setLoading(true);
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        setLoading(false);
      });

      return () => {
        unsub();
      };
    };

    currentUser?.uid && getChats();
  }, [currentUser.uid]);

  return (
    <div className="max-sm:w-full md4:w-1/4 h-full max-sm:p-3 md4:py-7">
      <div className="bg-white dark:bg-[#111] transition-all w-full h-full p-4 rounded-xl">
        {loading ? (
          <div className="w-full transition-all dark:text-white flex justify-center items-center gap-2">
            Loading your chats
            <RequestsLoader />
          </div>
        ) : (
          <ul className="w-full gap-3 flex flex-col">
            {chats ? (
              Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <li
                    onClick={() => handleSelect(chat[1].userInfo)}
                    key={chat[0]}
                    className="cursor-pointer w-full bg-[#f5f5f5] dark:bg-[#181818] transition-all h-16 gap-2 flex items-center pr-4 pl-2 rounded-2xl"
                  >
                    <div>
                      <div className="max-sm:h-12 max-sm:w-12 flex justify-center items-center overflow-hidden relative p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-image.png')] after:rotate-0 after:transition-all after:ease-in-out hover:after:rotate-[30deg]">
                        <img
                          className="object-cover h-full rounded-full"
                          src={chat[1].userInfo.profilePhoto}
                          alt="user-profile"
                        />
                      </div>
                    </div>
                    <div className="h-full py-2 w-3/4 justify-around flex flex-col ">
                      <p className="text-start text-xs font-bold truncate dark:text-white transition-all">
                        {chat[1].userInfo.username}
                      </p>
                      <p className="text-start text-xs text-gray-500 truncate">
                        {chat[1].lastMessage?.text
                          ? chat[1].lastMessage?.text
                          : "No recent message"}
                      </p>
                    </div>
                  </li>
                ))
            ) : (
              <p className="text-center text-xs text-gray-500 w-full">
                No chats to show!
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Chats;
