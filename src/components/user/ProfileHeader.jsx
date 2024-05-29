import React, { useContext } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import { GoPencil } from "react-icons/go";

const ProfileHeader = () => {
  const { currentUser } = useContext(RequestsContext);
  const joinDate = currentUser?.metadata.creationTime.split(" ");

  return (
    <div className="w-full rounded-lg max-sm:h-[23rem] sm:h-[20rem] md:h-[19rem] lg:h-[17rem] bg-[url('../../assets/images/user/banner.jpg')]">
      <div className="flex w-full h-full rounded-lg user-banner-shadow max-sm:items-center lg:items-end relative">
        <div className="flex items-center justify-between w-full gap-4 px-8 text-white max-sm:flex-col lg:flex-row max-sm:h-3/4">
          <div className="flex items-center gap-4 p-2 max-sm:flex-col lg:flex-row">
            <div className="relative cursor-pointer h-28 w-28 p-[10px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border-profile-header.png')] after:rotate-0 after:transition-all after:ease-in-out hover:after:rotate-[30deg]">
              <img
                src={currentUser?.photoURL}
                className="object-cover border-4 rounded-full"
              />
            </div>
            <div className="flex flex-col max-sm:text-center lg:text-start">
              <h3 className="text-xl capitalize">{currentUser?.displayName}</h3>
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
        <button className="absolute top-7 right-7 p-2 rounded-full bg-white hover:bg-[#d7d7d7] transition-all duration-300">
          <GoPencil className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
