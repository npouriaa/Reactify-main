import FeedBanner from "../../components/user/home/FeedBanner";
import Posts from "../../components/user/Posts/Posts";
import banner from "../../assets/images/user/banner.png";
import { useEffect, useState } from "react";
import NoPosts from "../../components/user/NoPosts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import LoaderModal from "../../components/LoaderModal";
import SearchUser from "../../components/user/SearchUser";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [postsArray, setPostsArray] = useState([]);

  const getAllPosts = async () => {
    setLoading(true);
    onSnapshot(collection(db, "posts"), async (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPostsArray(posts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <SearchUser styles="max-sm:flex md:hidden"/>
      <FeedBanner />
      <div className="w-full flex relative gap-4">
        <div className="max-sm:w-full min-h-full lg:w-3/5 xl:w-2/3 flex-col gap-3 flex justify-center items-center">
          {loading ? (
            <LoaderModal />
          ) : postsArray.length === 0 ? (
            <NoPosts text="No Posts To Show" />
          ) : (
            <Posts postsArray={postsArray} />
          )}
        </div>
        <div className="max-sm:hidden lg:flex lg:w-2/5 sticky top-24 xl:w-1/3 h-80 bg-[#ffca28] rounded-md flex-col items-center justify-between py-4">
          <div className="text-white text-2xl text-center">
            <h2 className="uppercase">The most popular</h2>
            <h2>Reactify</h2>
          </div>
          <img className="h-52 object-cover" src={banner} alt="banner" />
        </div>
      </div>
    </>
  );
};

export default Home;
