import React, { useContext, useEffect, useRef, useState } from "react";
import { RequestsContext } from "../../../context/RequestsContext";
import { GoPencil } from "react-icons/go";
import { ConfigProvider, Modal, message } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { DarkModeContext } from "../../../context/DarkModeContext";
import { db, storage } from "../../../firebase";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";

const ProfileHeader = ({ userData, postsLength }) => {
  const { currentUser, currentUserDBObj, setLoading } =
    useContext(RequestsContext);
  const { isDark } = useContext(DarkModeContext);
  const [open, setOpen] = useState(false);
  const [followingLength, setFollowingLength] = useState(
    userData?.following.length
  );
  const [followersLength, setFollowersLength] = useState(
    userData?.following.length
  );
  const [imgFile, setImgFile] = useState(null);
  const [modalType, setModalType] = useState("");
  const [followed, setFollowed] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const fileInput = useRef(null);
  const imagePreviewRef = useRef(null);
  const bgImageConRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.includes("image")) {
      messageApi.open({
        key: "uploadError",
        type: "error",
        content: "Please select an image file",
        duration: 4,
      });
      return;
    }

    if (file.size > 600 * 1024) {
      messageApi.open({
        key: "uploadError",
        type: "error",
        content: "Image size should be less than 600KB",
        duration: 4,
      });
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
      messageApi.open({
        key: "chnagePhotoError",
        type: "error",
        content: err.message,
        duration: 4,
      });
      console.log(err);
    }
  };

  const handleFollow = async () => {
    try {
      setFollowed(true);
      setFollowersLength(userData?.following.length + 1);
      const currentUserRef = doc(db, "users", currentUser.uid);
      const targetUserRef = doc(db, "users", userData.uid);
      const currentUserSnapshot = await getDoc(currentUserRef);
      const targetUserSnapshot = await getDoc(currentUserRef);
      const currentUserData = currentUserSnapshot.data();
      const targetUserData = targetUserSnapshot.data();
      const followersList = targetUserData.followers;
      const followingList = currentUserData.following;
      const targetUserFollowObj = {
        uid: userData.uid,
        profilePhoto: userData?.photoURL,
        username: userData?.displayName,
        bio: userData?.about?.bio,
        timestamp: Timestamp.now(),
      };
      const currentUserFollowObj = {
        uid: currentUserDBObj.uid,
        profilePhoto: currentUserDBObj?.photoURL,
        username: currentUserDBObj?.displayName,
        bio: currentUserDBObj?.about?.bio,
        timestamp: Timestamp.now(),
      };
      followersList.push(currentUserFollowObj);
      followingList.push(targetUserFollowObj);
      const updatedfollowersList = followersList;
      const updatedfollowingList = followingList;
      await updateDoc(currentUserRef, { following: updatedfollowingList });
      await updateDoc(targetUserRef, { followers: updatedfollowersList });
      console.log("done");
    } catch (err) {
      messageApi.open({
        key: "followError",
        type: "error",
        content: err.message,
        duration: 4,
      });
      setFollowersLength(userData?.following.length - 1);
      setFollowed(false);
    }
  };

  useEffect(() => {
    bgImageConRef.current.style.backgroundImage = `url(${userData?.headerBgProfile})`;
  }, [userData]);

  return (
    <>
      {contextHolder}
      <div
        ref={bgImageConRef}
        className="w-full rounded-lg max-sm:h-[26rem] lg:h-[17rem] bg-cover bg-no-repeat bg-center"
      >
        <div className="flex w-full h-full rounded-lg user-banner-shadow max-sm:items-center lg:items-end relative">
          <div className="flex items-center justify-between w-full gap-4 max-sm:px-1 sm:px-8 text-white max-sm:flex-col lg:flex-row max-sm:h-3/4">
            <div className="flex items-center gap-4 p-2  max-sm:flex-col lg:flex-row">
              <div className="flex group rounded-full justify-center items-center">
                <div className="relative cursor-pointer h-28 w-28 p-[10px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-header.png')]  after:rotate-0 after:transition-all after:ease-in-out group-hover:after:rotate-[30deg]">
                  <img
                    src={userData?.photoURL}
                    className="object-cover w-full h-full border-4 rounded-full"
                  />
                </div>
                {userData?.uid === currentUserDBObj?.uid && (
                  <button
                    onClick={() => showModal("profile")}
                    className="absolute edittt group-hover:flex hidden text-xs duration-300 w-[92px] h-[92px] bg-[#000000a9] rounded-full transition-all justify-center items-center gap-1"
                  >
                    Edit
                    <GoPencil className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-1 flex-col max-sm:text-center lg:text-start">
                <div className="flex max-sm:flex-col lg:flex-row gap-2 max-sm:items-center lg:items-start">
                  <h3 className="text-xl capitalize max-sm:order-2 lg:order-1">
                    {userData?.displayName}
                  </h3>
                  {userData?.uid !== currentUserDBObj?.uid &&
                    (followed ? (
                      <button className="max-sm:order-1 lg:order-2 py-1 w-24 bg-[#3b82f6] transition-all hover:bg-[#3779e3] rounded-md">
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow()}
                        className="max-sm:order-1 lg:order-2 py-1 w-24 bg-[#3b82f6] transition-all hover:bg-[#3779e3] rounded-md"
                      >
                        Follow
                      </button>
                    ))}
                </div>
                <h3 className="text-lg capitalize">
                  {userData?.about?.location}
                </h3>
                <h5 className="text-sm text-[#d7d7d7] capitalize">
                  joined {userData?.creationTime.split(" ")[2]}{" "}
                  {userData?.creationTime.split(" ")[3]}
                </h5>
              </div>
            </div>
            <div className="flex justify-center flex-wrap gap-4 text-sm text-[#d7d7d7] max-sm:items-center lg:items-end h-[3.4rem]">
              <p>
                Posts : <span className="text-white">{postsLength}</span>
              </p>
              <p>
                Followers :{" "}
                <span className="text-white">{followingLength}</span>
              </p>
              <p>
                Following :{" "}
                <span className="text-white">{followersLength}</span>
              </p>
            </div>
          </div>
          {userData?.uid === currentUserDBObj?.uid && (
            <button
              onClick={() => showModal("headerBg")}
              className="absolute top-7 right-7 p-2 rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300"
            >
              <GoPencil className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      {userData?.uid === currentUserDBObj?.uid && (
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
            title={
              modalType === "profile" ? "Profile photo" : "Background photo"
            }
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
      )}
    </>
  );
};

export default ProfileHeader;
