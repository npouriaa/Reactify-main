import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/user/Header";
import SideMenu from "../../components/user/SideMenu";
import Footer from "../../components/Footer";

const UserMainLayout = () => {
  return (
    <Layout className="w-screen ">
      <SideMenu />
      <Layout className="w-full ">
        <Header />
        <div className="w-full max-sm:mt-16 lg:mt-24 flex justify-center items-center max-sm:px-4 max-sm:py-8">
          <div className="flex flex-col gap-5 max-sm:w-full sm2:w-5/6 md2:w-3/4 lg:w-[90%] xl:w-3/4 3xl:w-3/5">
            <Outlet />
          </div>
        </div>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default UserMainLayout;
