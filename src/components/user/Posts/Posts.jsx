import Post from "./Post";

const Posts = ({ postsArray }) => {
  return (
    <>
      {postsArray?.map((post) => (
        <Post
          key={post.documentId}
          documentId={post.documentId}
          username={post.username}
          profilePhoto={post.profilePhoto}
          uid={post.uid}
          caption={post.text}
          likes={post.likes}
          comments={post.comments}
          media={post.postFiles}
          timestamp={post.timestamp}
        />
      ))}
    </>
  );
};

export default Posts;
