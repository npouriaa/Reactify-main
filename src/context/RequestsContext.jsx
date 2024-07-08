import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const RequestsContext = createContext();

const RequestsContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserDBObj, setCurrentUserDBObj] = useState();
  const [sendVerificationLink, setSendVerificationLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [PRLoading, setPRLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUserData = () => {
    try {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setCurrentUserDBObj(doc.data());
      });
    } catch (err) {
      console.log(err.message);
      setError(true);
    }
  };

  useEffect(() => {
    const asyncHandler = async (user) => {
      setPRLoading(true);
      try {
        const data = await user;
        console.log(user);
        if (data?.emailVerified) {
          setCurrentUser(user);
          localStorage.setItem("accessToken", user.accessToken);
        } else {
          localStorage.removeItem("accessToken");
        }
      } catch (err) {
        console.log(err);
        setError(true);
      }
      setPRLoading(false);
    };

    const unSub = onAuthStateChanged(auth, asyncHandler);

    return () => {
      unSub();
    };
  }, []);

  return (
    <RequestsContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        sendVerificationLink,
        setSendVerificationLink,
        loading,
        setLoading,
        PRLoading,
        currentUserDBObj,
        setCurrentUserDBObj,
        getUserData,
        error,
        setError,
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export { RequestsContextProvider, RequestsContext };
