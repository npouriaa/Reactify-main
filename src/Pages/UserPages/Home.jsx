import { useContext } from "react";
import { RequestsContext } from "../../context/RequestsContext";
import LoaderModal from "../../components/LoaderModal";

const Home = () => {
  const { loading } = useContext(RequestsContext);

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div>
      <p>Home</p>
      <h1>logged in</h1>
    </div>
  );
};

export default Home;
