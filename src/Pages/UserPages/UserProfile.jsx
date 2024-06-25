import React, { useContext, useEffect, useState } from "react";
import ProfileHeader from "../../components/user/userProfile/ProfileHeader";
import AddPost from "../../components/user/userProfile/AddPost";
import AboutMe from "../../components/user/userProfile/AboutMe";
import { useParams } from "react-router-dom";
import Posts from "../../components/user/Posts/Posts";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
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

  const getUserPosts = (uid) => {
    onSnapshot(collection(db, "posts"), async (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        if (doc.data().uid === uid) posts.push(doc.data());
      });
      setPostsArray(posts);
    });
  };

  const getSpecificUserData = async () => {
    setLoading(true);
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    setUserData(userData);
    getUserPosts(uid);
    setLoading(false);
  };

  useEffect(() => {
    if (uid === currentUserDBObj?.uid) {
      getUserPosts(currentUserDBObj?.uid);
    } else {
      getSpecificUserData();
    }
  }, [uid]);

  return (
    <>
      {loading ? (
        <LoaderModal />
      ) : (
        <>
          <ProfileHeader
            postsLength={postsArray?.length}
            userData={
              uid === currentUserDBObj?.uid ? currentUserDBObj : userData
            }
          />
          <div className="w-full flex flex-col ">
            <div className="w-full relative flex items-start gap-4 max-sm:flex-col lg:flex-row">
              <div className="max-sm:w-full lg:w-3/5 xl:w-2/3 flex flex-col gap-4 max-sm:order-2 lg:order-1">
                {uid === currentUserDBObj?.uid && <AddPost />}
                {postsArray?.length === 0 ? (
                  <NoPosts text="Create your first post" />
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
