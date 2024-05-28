import React from "react";
import ProfileHeader from "../../components/user/ProfileHeader";

const UserProfile = () => {
  return (
    <div className="w-full h-full flex justify-center items-start max-sm:px-4 max-sm:py-8">
      <div className="flex flex-col gap-5 max-sm:w-full sm2:w-5/6 md2:w-3/4 2xl:w-3/5">
        <ProfileHeader />
      </div>
    </div>
  );
};

export default UserProfile;
