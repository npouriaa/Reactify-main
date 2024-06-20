import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/user/Header";
import SideMenu from "../../components/user/SideMenu";
import Footer from "../../components/Footer";
import { useContext, useEffect } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../../components/LoaderModal";

const UserMainLayout = () => {
  const { getUserData, loading, currentUserDBObj } =
    useContext(RequestsContext);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <SideMenu />
      <Layout className="w-screen h-screen overflow-y-auto dark:bg-[#181818] transition-all">
        <Header />
        {loading || !currentUserDBObj ? (
          <LoaderModal />
        ) : (
          <>
            <div className="w-full max-sm:mt-16 lg:mt-24 flex justify-center items-center max-sm:px-4 max-sm:py-8">
              <div className="flex flex-col gap-5 max-sm:w-full sm2:w-[90%] md4:w-[85%] lg:w-[90%] xl:w-[85%] 2xl:w-4/5 4xl:w-3/5">
                <Outlet />
              </div>
            </div>
            <Footer />
          </>
        )}
      </Layout>
    </Layout>
  );
};

export default UserMainLayout;
