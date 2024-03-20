import { onAuthStateChanged } from "@firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const lsToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!lsToken) {
        localStorage.setItem("accessToken", await user.accessToken);
      }
      console.log(user);
    });

    return () => {
      unSub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider, AuthContext };
