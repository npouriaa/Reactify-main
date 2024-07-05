import React, { useEffect, useState } from "react";
import Chats from "../../components/user/userChats/Chats";
import ChatsScreen from "../../components/user/userChats/ChatsScreen";

const UserChats = () => {
  const [showChat, setShowChat] = useState(false);
  const [multiple, setMultiple] = useState(false);

  const showChatHandler = () => {
    setShowChat(!showChat);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900) {
        setMultiple(true);
      } else {
        setMultiple(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[calc(100%-80px)] fixed left-0 bottom-0 w-screen flex justify-center items-center">
      <div className="max-sm:w-full xl:w-[92.5%] 2xl:w-[94%] h-full absolute right-0 flex gap-3">
        {multiple ? (
          <>
            <Chats />
            <ChatsScreen />
          </>
        ) : showChat ? (
          <ChatsScreen showChatHandler={showChatHandler} />
        ) : (
          <Chats showChatHandler={showChatHandler} />
        )}
      </div>
    </div>
  );
};

export default UserChats;
