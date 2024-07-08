import { useContext, useEffect, useRef } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { Image } from "antd";

const Message = ({ message }) => {
  const { currentUser } = useContext(RequestsContext);
  const ref = useRef();

  const convertTimestampToString = (timestamp) => {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    const dateObj = new Date(milliseconds);
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      dateObj
    );
    const dateString = `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()} at ${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")} ${dateObj.getHours() >= 12 ? "PM" : "AM"}`;

    return dateString;
  };

  useEffect(() => {
    ref.current?.scrollIntoView();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full flex ${
        message.senderId === currentUser.uid ? "justify-end" : ""
      }`}
    >
      <div
        className={`py-2 px-3 max-sm:max-w-[300px] max-w-[max-content] ${
          message.senderId === currentUser.uid
            ? "bg-[#615DFA] text-white rounded-b-none rounded-l-3xl rounded-tr-3xl"
            : "bg-[#d5d5d5] dark:bg-[#181818] dark:text-white transition-all rounded-b-none rounded-r-3xl rounded-tl-3xl"
        }`}
      >
        {message.img && (
          <div className="rounded-xl">
            <Image src={message.img} alt="message-image" />
          </div>
        )}
        <p className="break-words p-2 max-sm:text-sm sm:text-sm">
          {message.text}
        </p>
        <p className="w-full text-right pr-[1px] text-xs">
          {convertTimestampToString(message.date)}
        </p>
      </div>
    </div>
  );
};

export default Message;
