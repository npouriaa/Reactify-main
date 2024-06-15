import { Link } from "react-router-dom";
import user from "../../assets/images/user/user.jpg";
import post from "../../assets/images/user/post.jpg";
import { Image } from "antd";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";

const Post = () => {
  const [like, setLike] = useState(false);
  const postImages = [{ src: post }, { src: post }, { src: post }];

  return (
    <div className="w-full min-h-[25rem] px-6 py-2 bg-white dark:bg-[#111] transition-all rounded-md flex gap-4 flex-col">
      <div className="flex items-center gap-4 p-2">
        <Link className="relative flex justify-center items-center h-14 w-14 p-[5px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:transition-all after:ease-in-out after:right-0 after:bg-[url('../../assets/images/user/border-gray.png')] before:absolute before:z-10 before:right-0 before:top-0 before:transition-all before:rotate-[30deg] before:opacity-0 before:bg-[url('../../assets/images/user/border-purple.png')] before:bg-cover before:bg-no-repeat before:ease-linear before:w-full before:h-full hover:before:opacity-100 hover:before:rotate-0">
          <img
            src={user}
            className="object-cover rounded-full"
            alt="user-profile"
          />
        </Link>
        <div className="flex flex-col dark:text-white  max-sm:text-center lg:text-start">
          <Link className="transition-all">Jesica Rose</Link>
          <p className="text-[#717993] dark:text-white transition-all text-sm font-thin">3hrs ago</p>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4 py-2">
        <p className="w-full break-words text-[#717993] dark:text-white transition-all">
          this is just test this is just test this is just test this is just
          test this is just test this is just test this is just test this is
          just test this is just test this is just test this is just test this
          is just test this is just test this is just tes
        </p>
        <div className="flex flex-wrap w-full gap-4 max-sm:justify-center 2xl:justify-start">
          <Image.PreviewGroup>
            {postImages.map((image, index) => (
              <Image key={index} alt="post-image" src={image.src} />
            ))}
          </Image.PreviewGroup>
        </div>
      </div>
      <div className="w-full flex text-[#393d4a] dark:text-white transition-all justify-between items-center">
        <p>1301 likes</p>
        <p>20 comments</p>
      </div>
      <div className="w-full flex gap-1 items-center py-2 border-t-[1px]">
        {like ? (
          <button onClick={() => setLike(!like)} className="cursor-pointer">
            <RiHeartFill className=" text-[#ff0000] h-[1.5rem] w-[1.5rem]" />
          </button>
        ) : (
          <button onClick={() => setLike(!like)} className="cursor-pointer">
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
