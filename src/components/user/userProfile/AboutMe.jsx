import { GoPencil } from "react-icons/go";
import { RequestsContext } from "../../../context/RequestsContext";
import { useContext, useState } from "react";
import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const AboutMe = () => {
  const { currentUser } = useContext(RequestsContext);
  const joinDate = currentUser?.metadata.creationTime.split(" ");
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white max-sm:order-1 lg:order-2 max-sm:w-full lg:w-2/5 xl:w-1/3 px-7 py-5">
      <div className="w-full h-9 flex item-center justify-between">
        <h3 className="text-[1.05rem] relative after:absolute after:bottom-0 after:left-0 after:rounded-md after:h-1 after:w-3 after:bg-[#615DFA] before:absolute before:bottom-0 before:left-4 before:h-1 before:rounded-md before:w-6 before:bg-[#615DFA]">
          About Me
        </h3>
        <button onClick={showModal} className="p-2 shadow-3xl rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300">
          <GoPencil className="w-5 h-5" />
        </button>
      </div>
      <div className="w-full gap-4 flex flex-col ">
        <p className="font-normal">
          Hi! My name is Rebeca Powel but some people may know me asserty
          GamePagla! I'm using Reatcify too.
        </p>
        <div className="flex flex-col gap-3 text-[.9rem] text-[#585858]">
          <p className="font-normal">
            Joined :{" "}
            <span className="text-black ">
              {joinDate[1]} {joinDate[2]} {joinDate[3]}
            </span>
          </p>
          <p className="font-normal">
            Email : <Link className="text-black">{currentUser?.email}</Link>
          </p>
          <p className="font-normal">
            Phone : <span className="text-black">+989395362203</span>
          </p>
          <p className="font-normal">
            Country : <span className="text-black">Iran</span>
          </p>
          <p className="font-normal">
            Web : <span className="text-black">me.com</span>
          </p>
          <p className="font-normal flex items-center gap-1">
            Socials :{" "}
            <span className="text-black flex gap-1">
              <Link>
                <FaInstagram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
              </Link>
              <Link>
                <FaTelegram className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
              </Link>
              <Link>
                <FaLinkedin className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
              </Link>
              <Link>
                <FaXTwitter className="w-5 h-5 duration-500 hover:text-[#69b1ff] transition-all text-[#585858]" />
              </Link>
            </span>
          </p>
        </div>
      </div>
      <Modal
        width={700}
        cla
        open={open}
        title="Edit your info"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <div className="flex max-sm:flex-col max-sm3:flex-row gap-4 justify-end">
            <button
              onClick={handleCancel}
              className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleOk}
              className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
            >
              Done
            </button>
          </div>
        )}
      >
        <div className="flex flex-col gap-3">
          
        </div>
      </Modal>
    </div>
  );
};

export default AboutMe;
