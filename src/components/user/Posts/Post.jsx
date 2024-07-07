import { Link } from "react-router-dom";
import { ConfigProvider, Image, Modal, message } from "antd";
import { useContext, useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import VideoPlayer from "../../VideoPlayer";
import {
  Timestamp,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebase";
import { RequestsContext } from "../../../context/RequestsContext";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { GoQuestion } from "react-icons/go";
import RequestsLoader from "../RequestsLoader";

const Post = ({
  profilePhoto,
  username,
  uid,
  media,
  caption,
  likes,
  comments,
  timestamp,
  postId,
}) => {
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { currentUser, currentUserDBObj } = useContext(RequestsContext);
  const [postFileWidth, setPostFileWidth] = useState(0);
  const { isDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [modalType, setModalType] = useState(false);
  const [confirmType, setConfirmType] = useState("Post");
  const [searchQuery, setSearchQuery] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [commentId, setCommentId] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const searchedData = likes.filter((obj) =>
    obj.username.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const postRef = doc(db, "posts", postId);

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

  const handleLike = async () => {
    try {
      setLiked(true);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
      const likeObj = {
        uid: currentUser.uid,
        profilePhoto: currentUser?.photoURL,
        username: currentUser?.displayName,
        bio: currentUserDBObj?.about?.bio,
        timestamp: Timestamp.now(),
      };
      const updatedPostLikes = [...postData.likes, likeObj];
      await updateDoc(postRef, { likes: updatedPostLikes });
    } catch (err) {
      messageApi.open({
        key: "likeError",
        type: "error",
        content: err.message,
        duration: 4,
      });
      setLiked(false);
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
      messageApi.open({
        key: "disLikeError",
        type: "error",
        content: err.message,
        duration: 4,
      });
      console.log(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (comment !== "") {
      try {
        setCommentLoading(true);
        messageApi.open({
          key: "commentUpload",
          type: "loading",
          content: "Adding your comment...",
          duration: 500,
        });
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();
        const commentObj = {
          commentId: uuidv4(),
          uid: currentUser.uid,
          profilePhoto: currentUser?.photoURL,
          username: currentUser?.displayName,
          comment,
          timestamp: Timestamp.now(),
        };
        const updatedPostComments = [...postData.comments, commentObj];
        await updateDoc(postRef, { comments: updatedPostComments });
        messageApi.open({
          key: "commentUpload",
          type: "success",
          content: "Comment added!",
          duration: 4,
        });
      } catch (err) {
        messageApi.open({
          key: "commentUpload",
          type: "error",
          content: err.message,
          duration: 4,
        });
        console.log(err);
        setCommentLoading(false);
      }
      setComment("");
      setCommentLoading(false);
    } else {
      messageApi.open({
        key: "commentUpload",
        type: "error",
        content: "Comment can't be empty !",
        duration: 4,
      });
    }
  };

  const handleDelete = async () => {
    try {
      setDisableBtn(true);
      if (confirmType === "Post") {
        await deleteDoc(doc(db, "posts", postId));
      } else if (confirmType === "Comment") {
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();
        const filteredCommentsArray = postData.comments.filter(
          (comment) => comment.commentId !== commentId
        );
        await updateDoc(postRef, { comments: filteredCommentsArray });
        setOpenConfirm(true);
        messageApi.open({
          key: "delete",
          type: "success",
          content: `${confirmType} deleted!`,
          duration: 4,
        });
      }
    } catch (err) {
      messageApi.open({
        key: "delete",
        type: "error",
        content: err.message,
        duration: 4,
      });
      console.log(err);
    }
    setDisableBtn(false);
    setOpenConfirm(false);
  };

  const showModal = (type) => {
    setOpen(true);
    setModalType(type);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const showModalConfirm = (type, id) => {
    setOpenConfirm(true);
    setConfirmType(type);
    setCommentId(id);
  };

  const handleCancelConfirn = () => {
    setOpenConfirm(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    likes.map((like) => {
      if (like.uid === currentUser?.uid) {
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
    <>
      {contextHolder}
      <div className="w-full min-h-[25rem] px-6 py-2 bg-white dark:bg-[#111] transition-all rounded-md flex gap-4 flex-col">
        <div className="flex justify-between items-center">
          <div className="flex w-[90%] items-center gap-4 pt-4">
            <Link
              to={`/${currentUser?.displayName}/profile/${uid}`}
              className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
            >
              <img
                src={profilePhoto}
                className="object-cover h-full rounded-full"
                alt="user-profile"
              />
            </Link>
            <div className="flex flex-col dark:text-white items-start">
              <Link
                to={`/${currentUser?.displayName}/profile/${uid}`}
                className="transition-all"
              >
                {username}
              </Link>
              <p className="text-[#858585] transition-all text-sm font-thin">
                {convertTimestampToString(timestamp)}
              </p>
            </div>
          </div>
          {uid === currentUser?.uid && (
            <button
              onClick={() => showModalConfirm("Post")}
              className="text-red-500"
            >
              <CiTrash size={25} />
            </button>
          )}
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
          <button onClick={() => showModal("likes")}>
            {likes.length} {likes.length === 1 ? "like" : "likes"}
          </button>
          <button onClick={() => showModal("comments")}>
            {comments.length} comments
          </button>
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
          <button onClick={() => showModal("Comment")}>
            <FaRegComment className="text-[#717993] dark:text-white transition-all scale-x-[-1] h-[1.35rem] w-[1.35rem]" />
          </button>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: isDark ? "#111" : "#fff",
              headerBg: isDark ? "#111" : "#fff",
              titleColor: isDark ? "#fff" : "#000",
            },
          },
        }}
      >
        <Modal
          width={550}
          open={open}
          title={modalType === "likes" ? "Likes" : "Comments"}
          footer={
            modalType === "likes" ? (
              ""
            ) : (
              <form className="w-full px-1 py-2 flex dark:text-white justify-between border-b ">
                <input
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-transparent w-[95%] dark:placeholder:text-[#9b9b9b]"
                  placeholder={`Add a comment for ${username}...`}
                  type="text"
                  value={comment}
                  maxLength={50}
                />
                {commentLoading ? (
                  <RequestsLoader />
                ) : (
                  <button type="submit" onClick={(e) => handleComment(e)}>
                    <IoMdSend size={22} />
                  </button>
                )}
              </form>
            )
          }
          onCancel={handleCancel}
        >
          <div className="w-full flex flex-col gap-4 pt-1">
            {modalType === "likes" && (
              <div className="dark:bg-[#181818] bg-[#e8e8e8] p-[.35rem] rounded-md flex w-full items-center gap-2">
                <IoSearchOutline color="#615DFA" size={22} />
                <input
                  onChange={(e) => handleSearch(e)}
                  className="bg-transparent dark:text-white w-full dark:placeholder:text-[#9b9b9b]"
                  placeholder="Search"
                  type="text"
                />
              </div>
            )}
            {modalType === "likes" ? (
              <>
                <div className="w-full dark:text-white flex border-1 border-b border-b-[#e8e8e8] dark:border-b-[#414141] py-2 justify-between">
                  <p>LIKED BY</p>
                  <p>
                    {likes.length} {likes.length === 1 ? "like" : "likes"}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-4">
                  {searchedData.length === 0 ? (
                    <p className="text-[#858585]">No users found.</p>
                  ) : (
                    searchedData?.map((likedUser) => (
                      <div
                        key={likedUser?.uid}
                        className="flex w-full h-14 dark:text-white items-center gap-3"
                      >
                        <Link
                          to={`/${currentUser?.displayName}/profile/${likedUser?.uid}`}
                          className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
                        >
                          <img
                            src={likedUser?.profilePhoto}
                            className="object-cover rounded-full h-full"
                            alt="user-profile"
                          />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            to={`/${currentUser?.displayName}/profile/${likedUser?.uid}`}
                            className="transition-all"
                          >
                            {likedUser?.username}
                          </Link>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <>
                {comments.length === 0 ? (
                  <p className="text-[#858585]">No comments yet.</p>
                ) : (
                  comments?.map((comment) => (
                    <div
                      key={comment?.commentId}
                      className="flex items-center justify-between dark:text-white "
                    >
                      <div className="flex items-start w-[95%] gap-3">
                        <Link
                          to={`/${currentUser?.displayName}/profile/${comment?.uid}`}
                          className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0"
                        >
                          <img
                            src={comment?.profilePhoto}
                            className="object-cover h-full rounded-full"
                            alt="user-profile"
                          />
                        </Link>
                        <div className="flex w-3/4 gap-1 flex-col">
                          <div className="flex gap-2 items-center">
                            <Link
                              to={`/${currentUser?.displayName}/profile/${comment?.uid}`}
                              className="transition-all"
                            >
                              {comment?.username}
                            </Link>
                            <p className="text-[#858585] text-xs">
                              {convertTimestampToString(comment?.timestamp)}
                            </p>
                          </div>
                          <p>{comment?.comment}</p>
                        </div>
                      </div>
                      {comment?.uid === currentUser?.uid && (
                        <button
                          onClick={() =>
                            showModalConfirm("Comment", comment?.commentId)
                          }
                          className="text-red-500"
                        >
                          <CiTrash size={25} />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </Modal>
      </ConfigProvider>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg: isDark ? "#111" : "#fff",
              headerBg: isDark ? "#111" : "#fff",
              titleColor: isDark ? "#fff" : "#000",
            },
          },
        }}
      >
        <Modal
          width={450}
          open={openConfirm}
          zIndex={10000}
          footer={
            <div className="flex max-sm:flex-col max-sm3:flex-row gap-4 justify-end">
              <button
                onClick={handleCancelConfirn}
                className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
              >
                Cancel
              </button>
              <button
                disabled={disableBtn}
                onClick={handleDelete}
                className="px-4 py-1 disabled:bg-red-500 disabled:cursor-not-allowed text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
              >
                Confirm
              </button>
            </div>
          }
          onCancel={handleCancelConfirn}
        >
          <div className="flex items-center gap-2">
            <GoQuestion size={25} className="text-blue-500" />
            <p className="dark:text-white">
              Are you sure you want to delete this {confirmType.toLowerCase()}?
            </p>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Post;
