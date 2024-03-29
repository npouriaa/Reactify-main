import { useContext, useEffect } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../../components/LoaderModal";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import useNotification from "../../Hooks/useNotification";

const Home = () => {
  const { loading, setLoading } = useContext(RequestsContext);
  const { openNotificationSuccess, contextHolder } = useNotification();
  const navigate = useNavigate();

  const logOutUser = async () => {
    setLoading(true);
    await auth.signOut();
    localStorage.removeItem("accessToken");
    setLoading(false);
    navigate("/login");
  };

  // useEffect(() => {
  //   openNotificationSuccess("Success", "Signed in succeefully", "top");
  // }, []);

  return <div></div>;
};

export default Home;
