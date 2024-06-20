import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RequestsContext } from "../context/RequestsContext";
import LoaderModal from "./LoaderModal";

const ProtectedRoute = ({ children }) => {
  const { currentUserUid } = useParams();
  const { currentUser, PRLoading } = useContext(RequestsContext);

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  } else if (PRLoading) {
    return <LoaderModal />;
  } else if (currentUser) {
    if (currentUserUid !== currentUser.uid) {
      return <Navigate to="/login" />;
    } else {
      return <>{children}</>;
    }
  }
};

export default ProtectedRoute;
