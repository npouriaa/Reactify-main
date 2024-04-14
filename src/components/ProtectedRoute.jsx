import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RequestsContext } from "../context/RequestsContext";
import LoaderModal from "./LoaderModal";

const ProtectedRoute = ({ children }) => {
  const { username } = useParams();
  const { currentUser, loading } = useContext(RequestsContext);

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  } else if (loading) {
    return <LoaderModal />;
  } else if (currentUser) {
    if (username.split("-")[1] !== currentUser.uid) {
      return <Navigate to="/login" />;
    } else {
      return <>{children}</>;
    }
  }
};

export default ProtectedRoute;
