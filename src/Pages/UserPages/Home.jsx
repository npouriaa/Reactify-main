import { useContext } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../../components/LoaderModal";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, setLoading } = useContext(RequestsContext);
  const navigate = useNavigate();

  const logOutUser = async () => {
    setLoading(true);
    await auth.signOut();
    localStorage.removeItem("accessToken");
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      {loading && <LoaderModal />}
      <p>Home</p>
      <h1>logged in</h1>
      <button onClick={() => logOutUser()}>logout</button>
    </div>
  );
};

export default Home;
