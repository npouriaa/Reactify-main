import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const RequestsContext = createContext();

const RequestsContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [sendVerificationLink, setSendVerificationLink] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user?.emailVerified) {
        setCurrentUser(user);
        localStorage.setItem("accessToken", user.accessToken);
      } else {
        localStorage.removeItem("accessToken");
      }
    });

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
      }}
    >
      {children}
    </RequestsContext.Provider>
  );
};

export { RequestsContextProvider, RequestsContext };
