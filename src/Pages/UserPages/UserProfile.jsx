import React from "react";
import ProfileHeader from "../../components/user/userProfile/ProfileHeader";
import AddPost from "../../components/user/userProfile/AddPost";
import AboutMe from "../../components/user/userProfile/AboutMe";

const UserProfile = () => {
  return (
    <>
      <ProfileHeader />
      <div className="w-full flex flex-col ">
        <div className="w-full flex items-start gap-4 max-sm:flex-col lg:flex-row">
          
          <AddPost />
          <AboutMe />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
