import React, { useContext, useRef, useState } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { GoPencil } from "react-icons/go";
import { Modal } from "antd";
import default_bg from "../../../assets/images/user/default-bg.jpg";
import { IoIosInformationCircleOutline } from "react-icons/io";

const ProfileHeader = () => {
  const { currentUser } = useContext(RequestsContext);
  const [open, setOpen] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const joinDate = currentUser?.metadata.creationTime.split(" ");
  const fileInput = useRef(null);
  const imagePreviewRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      setPreviewImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setPreviewImageSrc("");
    setOpen(false);
  };

  return (
    <>
      <div className="w-full rounded-lg max-sm:h-[23rem] sm:h-[21rem] lg:h-[17rem] bg-[url('../../assets/images/user/default-bg.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="flex w-full h-full rounded-lg user-banner-shadow max-sm:items-center lg:items-end relative">
          <div className="flex items-center justify-between w-full gap-4 px-8 text-white max-sm:flex-col lg:flex-row max-sm:h-3/4">
            <div className="flex items-center gap-4 p-2 max-sm:flex-col lg:flex-row">
              <div className="relative cursor-pointer h-28 w-28 p-[10px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-header.png')] after:rotate-0 after:transition-all after:ease-in-out hover:after:rotate-[30deg]">
                <img
                  src={currentUser?.photoURL}
                  className="object-cover h-full border-4 rounded-full"
                />
              </div>
              <div className="flex flex-col max-sm:text-center lg:text-start">
                <h3 className="text-xl capitalize">
                  {currentUser?.displayName}
                </h3>
                <h3 className="text-lg capitalize">Iran / Sabzevar</h3>
                <h5 className="text-sm text-[#d7d7d7] capitalize">
                  joined {joinDate[2]} {joinDate[3]}
                </h5>
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-4 text-[.9rem] text-[#d7d7d7] max-sm:items-center lg:items-end h-[3.4rem]">
              <p>
                Posts : <span className="text-white">30</span>
              </p>
              <p>
                Comments : <span className="text-white">47</span>
              </p>
              <p>
                Views : <span className="text-white">54.9k</span>
              </p>
            </div>
          </div>
          <button
            onClick={showModal}
            className="absolute top-7 right-7 p-2 rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300"
          >
            <GoPencil className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Modal
        width={700}
        cla
        open={open}
        title="Background photo"
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

            <label
              className="px-4 flex justify-center items-center cursor-pointer py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
              htmlFor="upload"
            >
              Change photo
            </label>
            <input
              onChange={handleFileUpload}
              ref={fileInput}
              className="hidden"
              type="file"
              id="upload"
            />
            <button
              onClick={handleOk}
              className="px-4 py-1 text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
            >
              Apply
            </button>
          </div>
        )}
      >
        <div className="flex flex-col gap-3">
          <div className="w-full h-40 bg-black">
            <img
              ref={imagePreviewRef}
              className="h-full w-full object-cover object-center"
              src={previewImageSrc ? previewImageSrc : default_bg}
              alt="background-photo"
            />
          </div>
          <div className="flex gap-1 items-center">
            <IoIosInformationCircleOutline className="w-6 h-6 text-[#ffaa29]" />
            <p className="text-[#6d6d6d] text-sm">
              Suggested size for image is 1132 x 272
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProfileHeader;
