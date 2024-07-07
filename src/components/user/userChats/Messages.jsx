import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      onSub();
    };
  }, [data.chatID]);

  return (
    <div className="p-4 h-[calc(100%_-_150px)] w-full overflow-y-auto flex flex-col gap-2">
      {messages.length === 0 ? (
        <div className="flex bg-white dark:bg-[#111] w-full h-full justify-center items-center rounded-xl">
          <div className="w-64 h-40 rounded-2xl bg-[#f5f5f5] dark:bg-[#181818] transition-all flex justify-center items-center">
            <h3 className="text-base dark:text-white transition-all">
              No messages here yet...
            </h3>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <Message message={message} key={message.id} />
        ))
      )}
    </div>
  );
};

export default Messages;
