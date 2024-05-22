import { Link } from "react-router-dom";
import user from "../assets/images/user-home/user.jpg";
import post from "../assets/images/user-home/post.jpg";
import { Image } from "antd";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { RiHeartLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";

const Post = () => {
  const [like, setLike] = useState(false);

  return (
    <div className="w-full min-h-[25rem] px-6 py-2 bg-white rounded-md flex gap-4 flex-col">
      <div className="w-full h-16 items-center flex gap-3">
        <img
          src={user}
          alt="user"
          className="object-cover rounded-full h-14 w-14"
        />
        <div className="w-full p-2 h-full items-start flex flex-col">
          <Link className="">Jesica Rose</Link>
          <p className="text-[#717993] text-sm font-thin">3hrs ago</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 py-2">
        <p className="w-full text-[#717993]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
          nesciunt minima commodi earum? Quia quis fugiat, laudantium velit
          incidunt aliquam aspernatur eveniet cupiditate fuga modi, quas, et
          neque officiis iste. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Veritatis nesciunt minima commodi earum? Quia quis
          fugiat, laudantium velit incidunt aliquam aspernatur eveniet
          cupiditate fuga modi, quas, et neque officiis iste.
        </p>
        <div className="w-full max-sm:justify-center 2xl:justify-start flex max-sm:gap-4 lg:gap-8 flex-wrap">
          <Image.PreviewGroup>
            <Image alt="post-image" src={post} />
          </Image.PreviewGroup>
        </div>
      </div>
      <div className="w-full flex text-[#393d4a] justify-between items-center">
        <p>1301 likes</p>
        <p>20 comments</p>
      </div>
      <div className="w-full flex gap-2 items-center py-2 border-t-[1px]">
        {like ? (
          <button onClick={() => setLike(!like)} className="cursor-pointer">
            <RiHeartFill className=" text-[#ff0000] h-[1.5rem] w-[1.5rem]" />
          </button>
        ) : (
          <button onClick={() => setLike(!like)} className="cursor-pointer">
            <RiHeartLine className=" text-[#717993] h-[1.5rem] w-[1.5rem]" />
          </button>
        )}
        <button>
          <FaRegComment
            className="text-[#717993] scale-x-[-1] h-[1.4rem] w-[1.4rem]"
          />
        </button>
        <button>
          <IoShareSocial className="text-[#717993] h-[1.4rem] w-[1.4rem]"/>
        </button>
      </div>
    </div>
  );
};

export default Post;
