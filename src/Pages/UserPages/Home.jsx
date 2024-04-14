import { useEffect } from "react";
import useNotification from "../../Hooks/useNotification";
import Header from "../../components/Home/Header";
import SideMenu from "../../components/Home/SideMenu";

const Home = () => {
  const { openNotificationSuccess, contextHolder } = useNotification();

  // useEffect(() => {
  //   openNotificationSuccess("Success", "Signed in succeefully", "top");
  // }, []);

  return (
    <div className="flex">
      {contextHolder}
      <SideMenu />
      <Header />
    </div>
  );
};

export default Home;
