import React, { useContext } from "react";
import { RequestsContext } from "../../context/RequestsContext";

const ProfileHeader = () => {
  const { currentUser } = useContext(RequestsContext);

  return (
    <div className="w-full rounded-lg max-sm:h-[23rem] sm:h-[20rem] md2:h-[20rem] lg:h-72 bg-[url('../../assets/images/user/banner.jpg')]">
      <div className="user-banner-shadow rounded-lg flex max-sm:items-center lg:items-end w-full h-full">
        <div className="w-full max-sm:flex-col lg:flex-row text-white max-sm:h-3/4  px-8 justify-between items-center flex gap-4">
          <div className="flex max-sm:flex-col lg:flex-row items-center p-2 gap-4">
            <div className="relative h-28 w-28 p-[10px] after:absolute after:bg-cover after:w-full after:h-full after:top-0 after:right-0 after:bg-[url('../../assets/images/user/border.png')]">
              <img
                src={currentUser?.photoURL}
                className="rounded-full object-cover"
              />
            </div>
            <div className=" flex max-sm:text-center lg:text-start flex-col">
              <h3 className="text-xl capitalize">{currentUser?.displayName}</h3>
              <h3 className="text-lg capitalize">Iran / Sabzevar</h3>
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
      </div>
    </div>
  );
};

export default ProfileHeader;
