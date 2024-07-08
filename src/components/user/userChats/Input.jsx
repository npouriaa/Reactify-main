import { useContext, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { MdOutlinePermMedia } from "react-icons/md";
import { RequestsContext } from "../../../context/RequestsContext";
import { ChatContext } from "../../../context/ChatContext";
import { message, Tooltip } from "antd";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { HiMiniXMark } from "react-icons/hi2";
import { DarkModeContext } from "../../../context/DarkModeContext";
import RequestsLoader from "../RequestsLoader";

const Input = () => {
  const { currentUser } = useContext(RequestsContext);
  const { data } = useContext(ChatContext);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { isDark } = useContext(DarkModeContext);

  const handleSend = async (e) => {
    e.preventDefault();
    if (text !== "" || img !== null) {
      setLoading(true);
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (err) => {
            messageApi.open({
              key: "upload",
              type: "error",
              content: "Error on upload !",
              duration: 4,
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatID), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatID), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".data"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatID + ".lastMessage"]: {
          text,
        },
        [data.chatID + ".data"]: serverTimestamp(),
      });
      setLoading(false);
      setText("");
      setImg(null);
    } else {
      messageApi.open({
        key: "senMessage",
        type: "error",
        content: "Please send text or image !",
        duration: 4,
      });
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#111111] dark:text-white absolute bottom-0 h-[60px] left-0 rounded-b-xl border-t border-[#a9a9a9] dark:border-[#424242] transition-all p-2">
      {contextHolder}
      <form
        onSubmit={(e) => handleSend(e)}
        className="flex w-full h-full dark:text-white items-center gap-3"
      >
        <input
          value={text}
          type="text"
          maxLength={200}
          className="h-full p-4 bg-transparent outline-none w-[calc(100%_-_85px)] h-full'"
          placeholder="Message"
          onChange={(e) => setText(e.target.value)}
        />
        {img && (
          <p className="w-20 flex justify-center items-center max-sm:text-xs sm:text-xs md:text-sm">
            + 1 Image
          </p>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImg(e.target.files[0])}
          id="file"
        />
        <label htmlFor="file" className="cursor-pointer text-[#717171]">
          <MdOutlinePermMedia size={24} />
        </label>
        {!loading ? (
          <button className="text-[#717171]" type="submit">
            <IoMdSend size={24} />
          </button>
        ) : (
          <RequestsLoader />
        )}
      </form>
    </div>
  );
};

export default Input;
