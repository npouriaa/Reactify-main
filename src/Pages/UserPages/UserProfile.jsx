import React from "react";
import ProfileHeader from "../../components/user/userProfile/ProfileHeader";
import AddPost from "../../components/user/userProfile/AddPost";
import AboutMe from "../../components/user/userProfile/AboutMe";
import { useParams } from "react-router-dom";
import Posts from "../../components/user/Posts/Posts";

const UserProfile = () => {
  const { userUid } = useParams();
  return (
    <>
      <ProfileHeader uid={userUid} />
      <div className="w-full flex flex-col ">
        <div className="w-full relative flex items-start gap-4 max-sm:flex-col lg:flex-row">
          <div className="max-sm:w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-4 max-sm:order-2 lg:order-1">
            <AddPost />
            <Posts />
          </div>
          <div className="max-sm:w-full top-24 max-sm:static lg:sticky lg:w-2/5 xl:w-1/3 max-sm:order-1 lg:order-2 ">
            <AboutMe uid={userUid}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
