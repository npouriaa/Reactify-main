import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "../../components/Home/Header";
import SideMenu from "../../components/Home/SideMenu";
import Footer from "../../components/Footer";

const UserMainLayout = () => {
  return (
    <Layout className="w-screen ">
      <SideMenu />
      <Layout className="w-full ">
        <Header />
        <div className="w-full flex justify-center items-center">
          <Outlet />
        </div>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default UserMainLayout;
