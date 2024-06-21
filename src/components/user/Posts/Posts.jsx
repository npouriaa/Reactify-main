import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import Post from "./Post";
import LoaderModal from "../../LoaderModal";
import { RequestsContext } from "../../../context/RequestsContext";
import { useParams } from "react-router-dom";

const Posts = ({ postsArray, loading }) => {
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
