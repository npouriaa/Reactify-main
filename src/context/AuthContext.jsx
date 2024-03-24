import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [sendVerificationLink, setSendVerificationLink] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (user?.emailVerified) {
        setCurrentUser(user);
      }
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        sendVerificationLink,
        setSendVerificationLink,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
