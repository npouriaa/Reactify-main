import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../components/user/userProfile/ProfileHeader";
import AddPost from "../../components/user/userProfile/AddPost";
import AboutMe from "../../components/user/userProfile/AboutMe";
import { useParams } from "react-router-dom";
import Posts from "../../components/user/Posts/Posts";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { RequestsContext } from "../../context/RequestsContext";
import NoPosts from "../../components/user/NoPosts";
import LoaderModal from "../../components/LoaderModal";

const UserProfile = () => {
  const { uid } = useParams();
  const { currentUserDBObj } = useContext(RequestsContext);
  const [postsArray, setPostsArray] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSpecificUserPosts = async () => {
    setLoading(true);
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    setUserData(userData);
    setPostsArray(userData?.posts);
    setLoading(false);
  };

  useEffect(() => {
    if (uid === currentUserDBObj?.uid) {
      setPostsArray(currentUserDBObj?.posts);
    } else {
      getSpecificUserPosts();
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <ProfileHeader
            userData={
              uid === currentUserDBObj?.uid ? currentUserDBObj : userData
            }
          />
          <div className="w-full flex flex-col ">
            <div className="w-full relative flex items-start gap-4 max-sm:flex-col lg:flex-row">
              <div className="max-sm:w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-4 max-sm:order-2 lg:order-1">
                {uid === currentUserDBObj?.uid && <AddPost />}
                {postsArray.length === 0 ? (
                  <NoPosts text="Yet" />
                ) : (
                  <Posts postsArray={postsArray} />
                )}
              </div>
              <div className="max-sm:w-full top-24 max-sm:static lg:sticky lg:w-2/5 xl:w-1/3 max-sm:order-1 lg:order-2 ">
                <AboutMe
                  userData={
                    uid === currentUserDBObj?.uid ? currentUserDBObj : userData
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
