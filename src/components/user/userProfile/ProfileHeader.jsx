import React, { useContext, useEffect, useRef, useState } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { GoPencil } from "react-icons/go";
import { ConfigProvider, Modal } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { db, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import useNotification from "../../../Hooks/useNotification";

const ProfileHeader = ({us}) => {
  const { currentUser, currentUserDBObj, setLoading } =
    useContext(RequestsContext);
  const { openNotificationError, contextHolder } = useNotification();
  const { isDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const joinDate = currentUser?.metadata.creationTime.split(" ");
  const fileInput = useRef(null);
  const imagePreviewRef = useRef(null);
  const bgImageConRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      openNotificationError("Error", "Please select an image file", "top");
      return;
    }

    if (file.size > 600 * 1024) {
      openNotificationError(
        "Error",
        "Image size should be less than 600KB",
        "top"
      );
      return;
    }
    const reader = new FileReader();
    setImgFile(file);

    reader.onload = function (e) {
      setPreviewImageSrc(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const showModal = (modalType) => {
    setOpen(true);
    setModalType(modalType);
  };
  const handleOk = () => {
    setOpen(false);
    changePhoto();
    setImgFile(null);
    setPreviewImageSrc("");
  };
  const handleCancel = () => {
    setPreviewImageSrc("");
    setOpen(false);
    setImgFile(null);
  };

  const changePhoto = async () => {
    setLoading(true);
    try {
      const storageRef = ref(
        storage,
        modalType === "profile"
          ? `profile/${currentUser?.displayName}-${currentUser?.uid}`
          : `headerBg/${currentUser?.displayName}-${currentUser?.uid}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imgFile);
      uploadTask.on(
        (err) => {
          console.log(err, "Error on upload");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const docRef = doc(db, "users", currentUser.uid);
            await updateProfile(
              currentUser,
              modalType === "profile"
                ? {
                    photoURL: downloadURL,
                  }
                : {
                    headerBgProfile: downloadURL,
                  }
            );
            await updateDoc(
              docRef,
              modalType === "profile"
                ? {
                    photoURL: downloadURL,
                  }
                : {
                    headerBgProfile: downloadURL,
                  }
            );
            setLoading(false);
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    bgImageConRef.current.style.backgroundImage = `url(${currentUserDBObj?.headerBgProfile})`;
  }, [currentUserDBObj]);

  return (
    <>
      {contextHolder}
      <div
        ref={bgImageConRef}
        className="w-full rounded-lg max-sm:h-[23rem] sm:h-[21rem] lg:h-[17rem] bg-cover bg-no-repeat bg-center"
      >
        <div className="flex w-full h-full rounded-lg user-banner-shadow max-sm:items-center lg:items-end relative">
          <div className="flex items-center justify-between w-full gap-4 px-8 text-white max-sm:flex-col lg:flex-row max-sm:h-3/4">
            <div className="flex items-center gap-4 p-2 max-sm:flex-col lg:flex-row">
              <div className="flex group rounded-full justify-center items-center">
                <div className="relative cursor-pointer h-28 w-28 p-[10px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-header.png')]  after:rotate-0 after:transition-all after:ease-in-out group-hover:after:rotate-[30deg]">
                  <img
                    src={currentUser?.photoURL}
                    className="object-cover w-full h-full border-4 rounded-full"
                  />
                </div>
                <button
                  onClick={() => showModal("profile")}
                  className="absolute edittt group-hover:flex hidden text-xs duration-300 w-[92px] h-[92px] bg-[#000000a9] rounded-full transition-all justify-center items-center gap-1"
                >
                  Edit
                  <GoPencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col max-sm:text-center lg:text-start">
                <h3 className="text-xl capitalize">
                  {currentUser?.displayName}
                </h3>
                <h3 className="text-lg capitalize">
                  {currentUserDBObj?.about?.location}
                </h3>
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
            onClick={() => showModal("headerBg")}
            className="absolute top-7 right-7 p-2 rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300"
          >
            <GoPencil className="w-5 h-5" />
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
          width={modalType === "profile" ? 370 : 700}
          open={open}
          title={modalType === "profile" ? "Profile photo" : "Background photo"}
          onOk={() => handleOk()}
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
                accept="image/*"
              />
              <button
                disabled={!imgFile}
                onClick={() => handleOk()}
                className="px-4 py-1 disabled:bg-red-500 disabled:cursor-not-allowed text-white rounded-md bg-[#615DFA] hover:bg-[#F5658C] transition-all"
              >
                Apply
              </button>
            </div>
          )}
        >
          <div className="flex flex-col gap-3">
            <div className="w-full h-40 flex justify-center items-center">
              {modalType === "profile" ? (
                <img
                  ref={imagePreviewRef}
                  className="h-32 w-32 rounded-full object-cover object-center"
                  src={
                    previewImageSrc ? previewImageSrc : currentUser?.photoURL
                  }
                  alt="background-photo"
                />
              ) : (
                <img
                  ref={imagePreviewRef}
                  className="h-full w-full object-cover object-center"
                  src={
                    previewImageSrc
                      ? previewImageSrc
                      : currentUserDBObj?.headerBgProfile
                  }
                  alt="background-photo"
                />
              )}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 items-center">
                <IoIosInformationCircleOutline className="w-6 h-6 text-[#ffaa29]" />
                <p className="text-[#6d6d6d] transition-all dark:text-white text-sm">
                  Suggested size for image is{" "}
                  {modalType === "profile" ? "640 x 640" : "1132 x 272"}
                </p>
              </div>
              <div className="flex gap-1 items-center">
                <IoIosInformationCircleOutline className="w-6 h-6 text-[#ffaa29]" />
                <p className="text-[#6d6d6d] transition-all dark:text-white text-sm">
                  Image size should be less than 600KB
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default ProfileHeader;
