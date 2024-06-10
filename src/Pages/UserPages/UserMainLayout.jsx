import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/user/Header";
import SideMenu from "../../components/user/SideMenu";
import Footer from "../../components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext, useEffect } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../../components/LoaderModal";

const UserMainLayout = () => {
  const {
    currentUser,
    loading,
    setLoading,
    setCurrentUserDBObj,
  } = useContext(RequestsContext);

  const getUserData = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCurrentUserDBObj(docSnap.data());
        console.log(docSnap.data());
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout className="w-screen ">
      <SideMenu />
      <Layout className="w-full ">
        <Header />
        {loading && <LoaderModal />}
        <div className="w-full max-sm:mt-16 lg:mt-24 flex justify-center items-center max-sm:px-4 max-sm:py-8">
          <div className="flex flex-col gap-5 max-sm:w-full sm2:w-5/6 md2:w-3/4 lg:w-[90%] xl:w-[85%] 2xl:w-4/5 4xl:w-3/5">
            <Outlet />
          </div>
        </div>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default UserMainLayout;
