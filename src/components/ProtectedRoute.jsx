import { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { RequestsContext } from "../context/RequestsContext";

const ProtectedRoute = ({ children }) => {
  const { username } = useParams();
  const { currentUser } = useContext(RequestsContext);

  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  } else if (currentUser) {
    if (username.split("-")[1] !== currentUser.uid) {
      return <Navigate to="/login" />;
    } else {
      return <>{children}</>;
    }
  }
};

export default ProtectedRoute;
