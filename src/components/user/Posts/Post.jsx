import { Link } from "react-router-dom";
import { Image } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import VideoPlayer from "../../VideoPlayer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { RequestsContext } from "../../../context/RequestsContext";
import useNotification from "../../../Hooks/useNotification";

const Post = ({
  profilePhoto,
  username,
  uid,
  media,
  caption,
  likes,
  comments,
  timestamp,
  documentId,
}) => {
  const [liked, setLiked] = useState(false);
  const { currentUser } = useContext(RequestsContext);
  const { openNotificationError } = useNotification();
  const [postFileWidth, setPostFileWidth] = useState(0);

  const convertTimestampToString = () => {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;

    const dateObj = new Date(milliseconds);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateString = `${dateObj.getDate()} ${
      months[dateObj.getMonth()]
    } ${dateObj.getFullYear()} ${dateObj.getHours()}:${String(
      dateObj.getMinutes()
    ).padStart(2, "0")}`;

    return dateString;
  };

  const postRef = doc(db, "posts", documentId);

  const handleLike = async () => {
    try {
      setLiked(true);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const likeObj = {
        uid: currentUser.uid,
        profilePhoto: currentUser?.photoURL,
        username: currentUser?.displayName,
      };
      const updatedPostLikes = [...postData.likes, likeObj];
      await updateDoc(postRef, { likes: updatedPostLikes });
    } catch (err) {
      openNotificationError("Error", err.message, "top");
      console.log(err);
    }
  };

  const handleDislike = async () => {
    try {
      setLiked(false);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const filteredLikesArray = postData.likes.filter(
        (like) => like.uid !== currentUser?.uid
      );
      await updateDoc(postRef, { likes: filteredLikesArray });
    } catch (err) {
      openNotificationError("Error", err.message, "top");
      console.log(err);
    }
  };

  useEffect(() => {
    likes.map((like) => {
      if (like.uid === currentUser?.uid) {
        console.log(currentUser?.uid)
        console.log(uid)
        setLiked(true);
      }
    });

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setPostFileWidth("w-[48%]");
      } else {
        setPostFileWidth("w-full");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full min-h-[25rem] px-6 py-2 bg-white dark:bg-[#111] transition-all rounded-md flex gap-4 flex-col">
      <div className="flex items-center gap-4 pt-4">
        <Link
          to={`/${currentUser?.displayName}/profile/${uid}`}
          className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
        >
          <img
            src={profilePhoto}
            className="object-cover rounded-full"
            alt="user-profile"
          />
        </Link>
        <div className="flex flex-col dark:text-white items-start">
          <Link to={`/${currentUser?.displayName}/profile/${uid}`} className="transition-all">
            {username}
          </Link>
          <p className="text-[#717993] dark:text-white transition-all text-sm font-thin">
            {convertTimestampToString()}
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-3">
        <p className="w-full break-words text-[#717993] dark:text-white transition-all">
          {caption}
        </p>
        <div className={`w-full flex flex-wrap gap-4 justify-start`}>
          {media?.map((file, index) => (
            <div
              key={index}
              className={`${
                (media?.length === 3 && index === 2) || media?.length === 1
                  ? "w-full"
                  : postFileWidth
              } flex items-center justify-center`}
            >
              {file.type.split("/")[0] === "image" ? (
                <Image
                  width={"100%"}
                  src={file.src}
                  key={index}
                  alt="post-image"
                />
              ) : (
                <VideoPlayer videoSrc={file.src} videoType={file.type} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex text-[#393d4a] dark:text-white transition-all justify-between items-center">
        <p>{likes.length} likes</p>
        <p>{comments.length} comments</p>
      </div>
      <div className="w-full flex gap-1 items-center py-2 border-t-[1px]">
        {liked ? (
          <button onClick={() => handleDislike()} className="cursor-pointer">
            <RiHeartFill className=" text-[#ff0000] h-[1.5rem] w-[1.5rem]" />
          </button>
        ) : (
          <button onClick={() => handleLike()} className="cursor-pointer">
            <RiHeartLine className=" text-[#717993] dark:text-white transition-all h-[1.5rem] w-[1.5rem]" />
          </button>
        )}
        <button>
          <FaRegComment className="text-[#717993] dark:text-white transition-all scale-x-[-1] h-[1.35rem] w-[1.35rem]" />
        </button>
        <button>
          <IoShareSocial className="text-[#717993] dark:text-white transition-all h-[1.4rem] w-[1.4rem]" />
        </button>
      </div>
    </div>
  );
};

export default Post;
