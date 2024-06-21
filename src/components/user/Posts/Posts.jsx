import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Post from "./Post";
import LoaderModal from "../../LoaderModal";
import { RequestsContext } from "../../../context/RequestsContext";
import { useParams } from "react-router-dom";

const Posts = ({ showAllPosts }) => {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);
  const { currentUserDBObj } = useContext(RequestsContext);
  const { uid } = useParams();
  const getAllPosts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
    });
    setPostsArray(posts);
    setLoading(false);
  };

  const getSpecificUserPosts = async () => {
    setLoading(true);
    const posts = [];
    const userRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userRef);
    console.log(userSnapshot.data());
    setPostsArray(userSnapshot.data().posts);
    setLoading(false);
  };

  useEffect(() => {
    if (showAllPosts) {
      getAllPosts();
    }
    if (uid === undefined) {
      setPostsArray(currentUserDBObj.posts);
    }else {
      getSpecificUserPosts()
    }
    // console.log(showAllPosts)
  }, []);

  return (
    <>
      {loading ? (
        <LoaderModal />
      ) : (
        postsArray?.map((post) => (
          <Post
            username={post.username}
            profilePhoto={post.profilePhoto}
            uid={post.uid}
            caption={post.text}
            likes={post.likes}
            comments={post.comments}
            media={post.postFiles}
            time={post.timestamp}
          />
        ))
      )}
    </>
  );
};

export default Posts;
