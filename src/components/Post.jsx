import { Link } from "react-router-dom";
import user from "../assets/images/user-home/user.jpg";
import post from "../assets/images/user-home/post.jpg";
import { Image } from "antd";

const Post = () => {
  return (
    <div className="w-full min-h-[25rem] p-6 bg-white rounded-md flex gap-4 flex-col">
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
      <div className="w-full flex flex-col gap-2">
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
            <Image
              alt="post-image"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
            <Image
              alt="post-image"
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </Image.PreviewGroup>
        </div>
      </div>
    </div>
  );
};

export default Post;
