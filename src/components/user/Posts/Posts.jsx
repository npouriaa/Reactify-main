import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Post from "./Post";
import LoaderModal from "../../LoaderModal";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push(doc.data());
      console.log(doc.data());
    });
    setPostsArray(posts);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
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
